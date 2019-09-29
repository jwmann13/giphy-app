$(document).ready(() => {
    let topics = ["penguins", "cats", "owls", "hamsters", "dogs", "ducks"];
    renderButtons(topics);
    // initIntersectionObserver();

    // click listener to pause/play gifs
    $('#gifs').on('click', '.gifcontainer,.gif,.text', function (event) {
        let clicked = $(this);
        let state = clicked.data('state');
        // handles if image is clicked directly
        if (clicked[0].nodeName == 'IMG') {
            console.log('hello');
            if (state === "still") {
                clicked.attr('src', clicked.data('animate')).data('state', 'animate');
            } else if (state === 'animate') {
                clicked.attr('src', clicked.data('still')).data('state', 'still');
            }
        // handles if description div is clicked
        } else if (clicked[0].nodeName == 'DIV') {
            let image = $(clicked[0].parentElement.parentElement.firstChild);
            state = image.data('state')
            console.log('goodbye', image);
            if (state === "still") {
                image.attr('src', image.data('animate')).data('state', 'animate');
            } else if (state === 'animate') {
                image.attr('src', image.data('still')).data('state', 'still');
            }
        }
    });

    // click listener to load gifs
    $('#buttons').on('click', '.gifBtn', function (event) {
        let apiKey = "QOFN0QbeSz8WpxqX33mOir8ublOe8djd";
        let queryURL = `https://api.giphy.com/v1/gifs/search?limit=30&api_key=${apiKey}&q=${$(this).data('topic')}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            renderGifs(response)
        });
    });

    // click listener to create new submission buttons
    $('input.btn').on('click', function (event) {
        event.preventDefault();
        let input = $('#newButton').val();
        if (input != '') {
            topics.push(input);
            renderButtons(topics)
        }
        $('#newButton').val('');
    });

    $('#gifs').on('scroll', function (event) {
        console.log(event.target)
    })
});

function renderButtons(entries) {
    $('#buttons').empty();
    for (let i = 0; i < entries.length; i++) {
        const element = entries[i];
        createButton(element, i);
    }
}

function createButton(input, index) {
    let button = $('<button>').addClass('btn btn-dark my-2 gifBtn').attr({
        'data-topic': input,
        'id': 'button-' + index
    }).text(input);
    $('#buttons').append(button);
}

function renderGifs(input) {
    $('#gifs').empty();
    for (let i = 0; i < input.data.length; i++) {
        const element = input.data[i];
        createGifDiv(element, i);
        // console.log(input);
    }
}

function createGifDiv(element, index) {
    let imgURLStill = element.images.fixed_width_still.url;
    let imgURLAnimate = element.images.fixed_width.url;
    let rating = element.rating;
    let source = element.source;
    let title = parseGifTitle(element.title);
    // console.log(element)
    let gifContainer = $('<div>').addClass('gifContainer').attr('id', 'gif-container-' + index);
    let image = $('<img>').addClass('gif').attr({
        'src': imgURLStill,
        'data-still': imgURLStill,
        'data-animate': imgURLAnimate,
        'data-state': 'still'
    });
    let overlay = $('<div>').addClass('overlay').append($('<div>').addClass('text').html(title + 'rated: ' + rating + '</br><a href="' + source + '">Source</a>'));
    gifContainer.append(image, overlay).appendTo('#gifs');
}

function parseGifTitle(title) {
    let attribution = ''
    if (title.indexOf(' by ') > 0) {
        attribution = title.replace(" GIF", "").slice(0, title.indexOf(' by ') - 4);
        attribution = '"' + attribution + '"</br>';
    } else if (title === '') {
        attribution = ''
    } else {
        attribution = title.replace(" GIF", "");
        attribution = '"' + attribution + '"</br>';
    }
    return attribution;
}