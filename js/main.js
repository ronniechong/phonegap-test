var app = {
    renderHomeView: function() {
        var html =
                "<div class='header'><h1>Home</h1></div>" +
                "<div class='search-view'>" +
                "<input class='search-key'/>" +
                "<ul class='employee-list'></ul>" +
                "</div>"
       $('body').html(this.homeTpl());
    $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    findByName: function() {
         var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    initialize: function() {
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        var self = this;
       this.store = new MemoryStore(function() {
             self.renderHomeView();
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();