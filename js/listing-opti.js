const url = "https://marvinbost.fr:3000/api/teddies"

fetch(url).then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            var $list = $("#list")
            for (let i = 0; i < json.length; i++) {

                var $temp = $("#product2").clone()
                const element = json[i]
                $temp.find('.card-title').text(element.name)
                $temp.find('#details').attr('onclick', "product(this.id)")
                $temp.find(".card-text").text(element.description)
                $temp.find("#price").text(element.price / 100 + "€")
                $temp.find("img").attr('src', element.imageUrl)
                $temp.find(".btn").attr('id', element._id)
                $temp = $temp.html()
                $list.append($temp);
            }
        });
    }
})

function product(id) {
    document.location = 'products.html?id=' + id
}