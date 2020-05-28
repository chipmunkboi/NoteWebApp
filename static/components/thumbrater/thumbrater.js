(function(){

    var thumbrater = {
        props: ['url', 'callback_url'],
        data: null,
        methods: {}
    };

    thumbrater.data = function() {
        var data = {
            num_display: 0, 
            num_assigned: 0, 
            thumb_state: [1,2], //1 is up button and 2 is down button
            get_url: this.url,
            set_url: this.callback_url,
            original_state: null,
        };
        thumbrater.methods.load.call(data);
        return data;
    };

    // thumbrater.methods.thumbs_over = function (thumb_idx) {
    //     let self = this;
    //     self.num_display = thumb_idx;
    // };

    thumbrater.methods.thumbs_out = function () {
        // Sets the number of stars back to the number of true stars.
        let self = this;
        self.num_display = self.num_assigned;
    };

    thumbrater.methods.set_rating = function (thumb_idx) {
        // Sets and sends to the server the number of stars.
        let self = this;
        self.num_assigned = thumb_idx;
        console.log("Num Assigned:", self.num_assigned);
        console.log("Original State", self.original_state);
        console.log("Thumb IDX", thumb_idx);
        console.log("");
        if(self.original_state == thumb_idx){
            self.num_assigned = 0;
        }
        self.original_state = self.num_assigned;
        axios.get(self.set_url,
            {params: {rating: self.num_assigned}});
    };

    thumbrater.methods.load = function () {
        // In use, self will correspond to the data of the table,
        // as this is called via grid.methods.load
        let self = this;
        axios.get(self.get_url)
            .then(function(res) {
                self.num_assigned = res.data.rating;
                self.num_display = res.data.rating;
                self.original_state = res.data.rating;
            })
    };

    utils.register_vue_component('thumbrater', 'components/thumbrater/thumbrater.html',
        function(template) {
            thumbrater.template = template.data;
            return thumbrater;
        });


})();
