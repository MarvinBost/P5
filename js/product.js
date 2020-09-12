$(document).ready(function () {
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("id");
    id ? prod(id) : console.log('AUCUNS ID')

    function prod(id) {
        $.ajax({
            type: "get",
            url: "https://marvinbost.fr:3000/api/teddies/" + id,
            dataType: "json",
            success: function (response) {
                $("#name").text(response.name)
                $("#desc").text(response.description)
                $('#categ').text('teddies')
                $('.cat').attr('href', '/index.html#teddies')
                $("img").attr("src", response.imageUrl)
                $("#price").text(response.price / 100 + "€")
                $(".add").attr('id', response._id)
                for (let i = 0; i < response.colors.length; i++) {
                    const color = response.colors[i]
                    try {
                        $('#options').append(new Option(color, i))

                    } catch (e) {
                        $('#options').append(new Option(color, null))
                    }
                }
            }
        })
    }
})