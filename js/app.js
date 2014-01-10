$(function() {

	var Profile = Backbone.Model.extend();

	var ProfileList = Backbone.Collection.extend({
		model: Profile,
		url: '/json/profiles.json'
	});

	var ProfileItemView = Backbone.View.extend({

		className: "profile",
		template: $("#profileTemplate").html(),

		render: function () {
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}
	});

	var ProfileView = Backbone.View.extend({

		el: "#profiles",
		profilesPerRow: 3,

		events: {
			"click .join": "clickJoin"
		},

		clickJoin: function() {
			window.location.href="mailto:jobs@fortifiedstudio.com?subject=Join%20Us";
		},

		render: function(eventName) {
			_.each(this.model.models, function(profile, index){
				this.renderProfileItem(profile, index);
			}, this);

			return this;
		},

		renderProfileItem: function (item, index) {

			var that = this;
			var profileView = new ProfileItemView({
				model: item
			});

			// Create a reference to the profileView element so
			//  we can style it
			var profileEl = profileView.render().el;

			// Determine which CSS classes should be applied to each profile
			$(profileEl).addClass((index < that.profilesPerRow) ? "top" : "");
			$(profileEl).addClass((index % that.profilesPerRow) ? "" : "left");
			$(profileEl).addClass((item.attributes.name === "join") ? "join" : "");

			this.$el.append(profileEl);
		}
	});

	var Project = Backbone.Model.extend();

	var ProjectList = Backbone.Collection.extend({
		model: Project,
		url: '/json/projects.json'
	});

	var ProjectItemView = Backbone.View.extend({

		className: "project",
		template: $("#projectTemplate").html(),

		render: function () {
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		}

	});

	var ProjectView = Backbone.View.extend({

		el: "#projects",
		template: _.template($('#projectTemplate').html()),
		page: 0,
		perPage: 5,
		totalPages: 0,
		loadMore: null,

		initialize: function() {

			var that = this;

			// Create a reference to the load more button
			this.loadMore = new LoadMoreProjectsView();

			// Bind the load more button
			(this.loadMore.$el).on("click", function() {
				that.renderNextProjectGroup();
			});
		},

		render: function (eventName) {
			this.totalPages = Math.ceil(_.size(this.model.models) / this.perPage);
			return this.renderProjectGroup(0, this.perPage - 1);
		},

		renderProjectGroup : function(start, end) {

			var subset = _.filter(this.model.models, function(num, index){
				return (index >= start) && (index <= end);
			});

			_.each(subset, function (project) {
				this.renderProjectItem(project);
			}, this);

			this.renderLoadMoreButton();

			return this;
		},

		renderNextProjectGroup: function () {
			if(this.page < this.totalPages) {
				this.page++;
				var start = this.page * this.perPage;
				var end = start + (this.perPage - 1);
				this.renderProjectGroup(start, end);
			}
		},

		renderProjectItem: function (item) {
			var projectView = new ProjectItemView({
				model: item
			});

			// Create a reference to the projectView element so
			//  we can style it and attach flexslider code to it
			var projectEl = projectView.render().el;
			this.$el.append(projectEl);

			// Apply colorbox to anchored slides with the vimeo class
			if(Modernizr.touch) {
				$(projectEl).find('.vimeo').attr('target','_blank');
			} else {
				$(projectEl).find('.vimeo').colorbox({
					iframe: true,
					innerWidth: 960,
					innerHeight: 540,
					maxWidth: 960,
					speed: 200,
					transition: 'fade',
					opacity: '0.75',
					scrolling: false,
					close: '&times;',
					returnFocus: false
				});
			}

			// We have to apply flexslider code to elements with the flexslider
			//  class here because it's apparently not otherwise possible to apply
			//  it to dynamically created elements
			$(projectEl).find('.flexslider').flexslider({
				namespace: "flex-",
				selector: ".slides > li",
				animation: "slide",
				easing: "easeOutQuad",
				// controlsContainer: ".nav-container",
				// manualControls: ".flex-control-nav",
				controlNav: true,
				directionNav: true,
				animationSpeed: 300,
				slideshow: false
			});

			$(projectEl).addClass("show");
		},

		renderLoadMoreButton: function() {
			// If we're on the last page, hide the load more button
			if(this.page >= (this.totalPages - 1)) {
				this.loadMore.$el.hide();
			}
			// Otherwise we need to push the load more to the bottom of the portfolio view
			else {
				this.$el.append( this.loadMore.$el.detach().show() );
			}
		}

	});

	var LoadMoreProjectsView = Backbone.View.extend({
		el: $("#load-more-projects")
	});

	var Capability = Backbone.Model.extend();

	var CapabilityList = Backbone.Collection.extend({
		model: Capability,
		url: '/json/capabilities.json'
	});

	var CapabilityItemView = Backbone.View.extend({

		tagName: "li",

		render: function () {
			var capabilityJSON = this.model.toJSON();
			// Wrap the title in a span for CSS purposes
			this.$el.html($("<span>").html(capabilityJSON.title));
			return this;
		}
	});

	var CapabilityView = Backbone.View.extend({

		el: "#capabilities-list ul",

		render: function(eventName) {
			_.each(this.model.models, function(capability){
				this.renderCapabilityItem(capability);
			}, this);

			return this;
		},

		renderCapabilityItem: function (item) {

			var that = this;

			var capabilityView = new CapabilityItemView({
				model: item
			});

			// Create a reference to the capabilityView element so
			//  we can style it
			var capabilityEl = capabilityView.render().el;
			this.$el.append(capabilityEl);
		}
	});

	var AppView = Backbone.View.extend({

		el: "body",

		initialize: function() {

			var profiles = new ProfileList();
			var profilesView = new ProfileView({
				model: profiles
			});

			// When profiles have been successfully grabbed, display them using profile template
			profiles.bind('reset', function () {
				profilesView.render();
			});

			var projects = new ProjectList();
			var projectsView = new ProjectView({
				model: projects
			});

			// When projects have been successfully grabbed, display them using project template
			projects.bind('reset', function () {
				projectsView.render();
			});

			var capabilities = new CapabilityList();
			var capabilitiesView = new CapabilityView({
				model: capabilities
			});

			// When capabilitys have been successfully grabbed, display them using capability template
			capabilities.bind('reset', function () {
				capabilitiesView.render();
			});

			profiles.fetch();
			projects.fetch();
			capabilities.fetch();
		}
	});

	var App = new AppView();
});
