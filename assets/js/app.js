$(document).ready(() => {
    let topics = ["penguins", "cats", "owls", "hamsters", "dogs", "ducks"];
    renderButtons(topics);

    // click listener to pause/play gifs
    $('#gifs').on('click', '.gifcontainer,.gif,.text', function (event) {
        let clickedItem = $(this);
        let state = clickedItem.data('state');

        // handles if image is clicked directly
        if (clickedItem[0].nodeName == 'IMG') {

            if (state === "still") {
                clickedItem.attr('src', clickedItem.data('animate')).data('state', 'animate');
            } else if (state === 'animate') {
                clickedItem.attr('src', clickedItem.data('still')).data('state', 'still');
            }

            // handles if description div is clicked
        } else if (clickedItem[0].nodeName == 'DIV') {

            let image = $(clickedItem[0].parentElement.parentElement.firstChild);
            state = image.data('state');
            if (state === "still") {
                image.attr('src', image.data('animate')).data('state', 'animate');
            } else if (state === 'animate') {
                image.attr('src', image.data('still')).data('state', 'still');
            }

        }
    });

    // click listener to load gifs
    $('#buttons').on('click', '.gifBtn', function (event) {
        const apiKey = "QOFN0QbeSz8WpxqX33mOir8ublOe8djd";
        let queryURL = `https://api.giphy.com/v1/gifs/search?limit=30&api_key=${apiKey}&q=${$(this).data('topic')}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            renderGifs(response)
        });
        console.log(section)
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

    // $('#gifs').on('scroll', function (event) {
    //     console.log(event.target)
    // })
});

// createButton() adds button to #buttons container; renderButtons() displays #buttons
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

// createGifDiv() creates containers for gif img and description text then adds them to #gifs; renderGifs() displays #gifs
function renderGifs(input) {
    $('#gifs').empty();
    for (let i = 0; i < input.data.length; i++) {
        const element = input.data[i];
        createGifDiv(element, i);
    }
}

function createGifDiv(element, index) {
    const imgURLStill = element.images.fixed_width_still.url;
    const imgURLAnimate = element.images.fixed_width.url;
    const rating = element.rating;
    const source = element.source;
    const title = parseGifTitle(element.title);

    let gifContainer = $('<div>').addClass('gifContainer').attr('id', 'gif-container-' + index);
    let image = $('<img>').addClass('gif').attr({
        'src': imgURLStill,
        'data-still': imgURLStill,
        'data-animate': imgURLAnimate,
        'data-state': 'still'
    });
    let overlay = $('<div>').addClass('overlay').append($('<div>').addClass('text').html(title + 'rated: ' + rating + '</br><a href="' + source + '" target="_blank" rel="noopener noreferrer">Source</a>'));

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

function stopAllGifs() {

}