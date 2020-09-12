$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "https://marvinbost.fr:3000/api/teddies",
        data: "application/json",
        dataType: "json",
        success: function (response) {
            var $list = $("#list1")
            for (let i = 0; i < response.length; i++) {
                var $temp = $("#product2").clone()
                const element = response[i]
                $temp.find('.card-title').text(element.name)
                $temp.find('#details').attr('onclick', "product(this.id,'teddies')")
                $temp.find(".card-text").text(element.description)
                $temp.find("#price").text(element.price / 100 + "€")
                $temp.find("img").attr('src', element.imageUrl)
                $temp.find(".btn").attr('id', element._id)
                $temp = $temp.html()
                $list.append($temp);
            }
        }
    });
    $.ajax({
        type: "get",
        url: "https://marvinbost.fr:3000/api/cameras",
        data: "application/json",
        dataType: "json",
        success: function (response) {
            var $list = $("#list2")
            for (let i = 0; i < response.length; i++) {
                var $temp = $("#product2").clone()
                const element = response[i]
                $temp.find('.card-title').text(element.name)
                $temp.find('#details').attr('onclick', "product(this.id,'cameras')")
                $temp.find(".card-text").text(element.description)
                $temp.find("#price").text(element.price / 100 + "€")
                $temp.find("img").attr('src', element.imageUrl)
                $temp.find(".btn").attr('id', element._id)
                $temp = $temp.html()
                $list.append($temp);
            }
        }
    });
    $.ajax({
        type: "get",
        url: "https://marvinbost.fr:3000/api/furniture",
        data: "application/json",
        dataType: "json",
        success: function (response) {
            var $list = $("#list3")
            for (let i = 0; i < response.length; i++) {
                var $temp = $("#product2").clone()
                const element = response[i]
                $temp.find('.card-title').text(element.name)
                $temp.find('#details').attr('onclick', "product(this.id,'furniture')")
                $temp.find(".card-text").text(element.description)
                $temp.find("#price").text(element.price / 100 + "€")
                $temp.find("img").attr('src', element.imageUrl)
                $temp.find(".btn").attr('id', element._id)
                $temp = $temp.html()
                $list.append($temp);
            }
        }
    });
});

function product(id, cat) {
    document.location = 'products.html?id=' + id + '&cat=' + cat
}