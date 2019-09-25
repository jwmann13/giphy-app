$(document).ready(() => {
    let topics = ["penguins", "cats", "owls", "hamsters", "dogs", "ducks"];
    let apiKey = "QOFN0QbeSz8WpxqX33mOir8ublOe8djd";

    for (let i = 0; i < topics.length; i++) {
        const element = topics[i];
        let button = $('<button>').addClass('btn btn-dark m-2').attr('data-topic', element);
        button.text(element);
        $('#buttons').append(button);
    }
    $('button').on('click', function (event) {
        let queryURL = `https://api.giphy.com/v1/gifs/search?limit=10&api_key=${apiKey}&q=${$(this).data('topic')}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                let imgURL = element.images.fixed_height.url;
                console.log(imgURL)
                let image = $('<img>').attr('src', imgURL);
                $('#gifs').append(image);
                console.log(response);
            }
        })
    })
})