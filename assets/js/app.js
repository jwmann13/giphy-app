$(document).ready(() => {
    renderButtons();

    $('#gifs').on('click', '.gifContainer,.gif,.overlay,.text', function (event) {
        // console.log(event);
        // console.log('clicked', $(this));
        let state = $(this).data('state');
        if (state === "still") {
            $(this).attr('src', $(this).data('animate')).data('state', 'animate');
        } else if (state === 'animate') {
            $(this).attr('src', $(this).data('still')).data('state', 'still');
        }
    });

    $('#buttons').on('click', '.gifBtn', function (event) {
        let apiKey = "QOFN0QbeSz8WpxqX33mOir8ublOe8djd";
        let queryURL = `https://api.giphy.com/v1/gifs/search?limit=30&api_key=${apiKey}&q=${$(this).data('topic')}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $('#gifs').empty();
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                createGifDiv(element);
                // console.log(response);
            }
        });
    });

    $('input.btn').on('click', function (event) {
        event.preventDefault();
        let input = $('#newButton').val();
        if (input != '') {
            createButton(input);
        }
    });
});

function renderButtons() {
    let topics = ["penguins", "cats", "owls", "hamsters", "dogs", "ducks"];
    $('#buttons').empty();
    for (let i = 0; i < topics.length; i++) {
        const element = topics[i];
        createButton(element);
    }
}

function createGifDiv(element) {
    let imgURLStill = element.images.fixed_width_still.url;
    let imgURLAnimate = element.images.fixed_width.url;
    let rating = element.rating;
    let source = element.source;
    let title = parseGifTitle(element.title);
    // console.log(element)
    let gifContainer = $('<div>').addClass('gifContainer');
    let image = $('<img>').addClass('gif').attr({
        'src': imgURLStill,
        'data-still': imgURLStill,
        'data-animate': imgURLAnimate,
        'data-state': 'still'
    });
    let overlay = $('<div>').addClass('overlay').append($('<div>').addClass('text').html('"'+ title +'"</br>rated: ' + rating + '</br><a href="' + source +'">Source</a>'));
    gifContainer.append(image, overlay).appendTo('#gifs');
}

function createButton(input){
    let button = $('<button>').addClass('btn btn-dark my-2 gifBtn').attr('data-topic', input);
        button.text(input);
        $('#buttons').append(button);
}

function parseGifTitle(title){
    let output = title.replace(" GIF", "");
    return output;
}