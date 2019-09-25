$(document).ready(() => {
    let topics = ["penguins", "cats", "owls", "hamsters", "dogs", "ducks"];

    for (let i = 0; i < topics.length; i++) {
        const element = topics[i];
        let button = $('<button>').addClass('btn btn-dark m-2').attr('data-topic', element);
        button.text(element);
        $('#buttons').append(button);
    }

    $('.container').on('click', '.gif', function (event) {
        // console.log(event);
        // console.log('clicked', $(this));
        let state = $(this).data('state');
        if (state === "still") {
            $(this).attr('src', $(this).data('animate')).data('state', 'animate');
        } else if (state === 'animate') {
            $(this).attr('src', $(this).data('still')).data('state', 'still');
        }
    });

    $('button').on('click', function (event) {
        let apiKey = "QOFN0QbeSz8WpxqX33mOir8ublOe8djd";
        let queryURL = `https://api.giphy.com/v1/gifs/search?limit=10&api_key=${apiKey}&q=${$(this).data('topic')}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $('#gifs').empty();
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                let imgURLStill = element.images.fixed_height_still.url;
                let imgURLAnimate = element.images.fixed_height.url;
                // console.log(imgURLStill)
                let image = $('<img>').addClass('gif').attr({
                    'src': imgURLStill,
                    'data-still': imgURLStill,
                    'data-animate': imgURLAnimate,
                    'data-state': 'still'
                });
                $('#gifs').append(image);
                // console.log(response);
            }
        });
    });
});