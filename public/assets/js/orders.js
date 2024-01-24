$(document).ready(function () {
    var searchOrderValue = "";
    var flag1 = false;
    var flag2 = false;
    var startDate = "";
    var endDate = "";
    var ajaxData = {};
    var des_id = {};

    $(".updateOrderManager").change(function () {
        $(this).removeClass("is-invalid");
        let selectedValue = $(this).val();
        if (selectedValue < 0) {
            $(this).addClass("is-invalid");
        } else {
            let i = $(this).attr("k");
            var d0 = $("#firstD_" + i).val();
            var d1 = $("#secondD_" + i).val();
            var d2 = $("#thirdD_" + i).val();
            var d3 = $("#fourthD_" + i).val();
            var sum = Number(d0) + Number(d1) + Number(d2) + Number(d3);
            var goodInventory = Number($("#goodInventory_" + i).text());
            if (sum > goodInventory) {
                $(this).val(0);
                $(this).addClass("is-invalid");
            }
        }
    });

    $(".updateOrdersButtonClass").click(function () {
        var lengthOfDatas = $("#lengthOfDatas").val();
        var orderStatus = $("#orderStatus").val();
        var orderId = $("#lengthOfDatas").attr("orderId");
        var datas = [];
        for (let i = 0; i < lengthOfDatas; i++) {
            var d0 = $("#firstD_" + i).val();
            var d1 = $("#secondD_" + i).val();
            var d2 = $("#thirdD_" + i).val();
            var d3 = $("#fourthD_" + i).val();

            var d0Id = $("#firstD_" + i).attr("destinationId");
            var d1Id = $("#secondD_" + i).attr("destinationId");
            var d2Id = $("#thirdD_" + i).attr("destinationId");
            var d3Id = $("#fourthD_" + i).attr("destinationId");

            var goodId = $("#goodIdOfEachValue_" + i).val();

            var data = {
                d0: d0,
                d1: d1,
                d2: d2,
                d3: d3,
                d0Id: d0Id,
                d1Id: d1Id,
                d2Id: d2Id,
                d3Id: d3Id,
                goodId: goodId,
            };
            datas.push(data);
        }
        var ajaxData = {
            datas: datas,
            orderStatus: orderStatus,
        };
        $.ajax({
            url: `/orders/${orderId}`,
            method: "PUT",
            data: ajaxData,
            headers: {
                "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content"),
            },
            success: function (res, status) {
                $("#orderToast").show();
                setTimeout(function () {
                    $("#orderToast").fadeOut(1000);
                }, 2000);
                // location.reload();
            },
            error: function (xhr, status, error) {
                console.log("error");
            },
        });
    });

    $("#orderRequestButton").click(function () {
        var delivery_date = $("#delivery_date").val();
        console.log("deliverydate=>", delivery_date);
        if (delivery_date == "") return;
        var lengthOfDatas = $("#lengthOfDatas").val();
        // var orderId = $("#lengthOfDatas").attr("orderId");
        var d0Id = $("#des_id_0").val();
        var d1Id = $("#des_id_1").val();
        var d2Id = $("#des_id_2").val();
        var d3Id = $("#des_id_3").val();

        var d0Loc = $("#des_0").val();
        var d1Loc = $("#des_1").val();
        var d2Loc = $("#des_2").val();
        var d3Loc = $("#des_3").val();

        des_id = {
            d0Id: d0Id,
            d1Id: d1Id,
            d2Id: d2Id,
            d3Id: d3Id,
        };

        var datas = [];
        for (let i = 0; i < lengthOfDatas; i++) {
            var d0 = $("#fD_" + i).val() ? $("#fD_" + i).val() : 0;
            var d1 = $("#sD_" + i).val() ? $("#sD_" + i).val() : 0;
            var d2 = $("#tD_" + i).val() ? $("#tD_" + i).val() : 0;
            var d3 = $("#foD_" + i).val() ? $("#foD_" + i).val() : 0;

            var goodId = $("#goodIdOfEachValue_" + i).val();

            var data = {
                d0: d0,
                d1: d1,
                d2: d2,
                d3: d3,
                d0Id: d0Id,
                d1Id: d1Id,
                d2Id: d2Id,
                d3Id: d3Id,
                d0Loc: d0Loc,
                d1Loc: d1Loc,
                d2Loc: d2Loc,
                d3Loc: d3Loc,
                goodId: goodId,
            };
            datas.push(data);
        }
        ajaxData = {
            datas: datas,
            delivery_date: delivery_date,
            des_id: des_id,
        };
    });
    $("#confirmOrderRequest").click(function () {
        $.ajax({
            url: `/orders`,
            method: "POST",
            data: ajaxData,
            headers: {
                "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content"),
            },
            success: function (res, status) {
                if (res == "success") {
                    $("#cancelOrderRequest").click();
                    $("#newOrderToast").addClass("bg-success");
                    $("#newOrderToast").show();
                    setTimeout(function () {
                        $("#newOrderToast").fadeOut(1000);
                    }, 2000);
                    // location.reload();
                } else {
                    $("#cancelOrderRequest").click();
                    $("#newOrderToast").addClass("bg-danger");
                    $("#newOrderToastValue").text("登録できません。");
                    $("#newOrderToast").show();
                    setTimeout(function () {
                        $("#newOrderToast").fadeOut(1000);
                    }, 2000);
                }
            },
            error: function (xhr, status, error) {
                console.log("error");
            },
        });
    });

    $(".orderNumber").on("change", function () {
        $(this).removeClass("is-invalid");
        var rowNumber = $(this).attr("key");
        var value = $(this).val();
        if (value < 0) {
            $(this).addClass("is-invalid");
            $(this).val(0);
        } else {
            var remainGoods = Number($("#remainOrder_" + rowNumber).text());

            var fir = $("#fD_" + rowNumber).val();
            var sec = $("#sD_" + rowNumber).val();
            var thr = $("#tD_" + rowNumber).val();
            var fur = $("#foD_" + rowNumber).val();
            var sum = Number(fir) + Number(sec) + Number(thr) + Number(fur);
            if (remainGoods - value < 0) {
                $(this).val(0);
                $(this).addClass("is-invalid");
            } else {
                $("#orderSum_" + rowNumber).text(sum);
                $("#remainOrder_" + rowNumber).text(remainGoods - value);
            }
        }
    });

    $("#searchUserOrderField").on("input", function () {
        var value = $("#searchUserOrderField").val();
        searchOrderValue = value;
        $("#searchUserOrderButton").attr(
            "href",
            `/orders?value=${searchOrderValue}`
        );
    });

    $("#periodStartDate").change(function () {
        flag1 = true;
        startDate = $("#periodStartDate").val();
        let data = {
            startDate: startDate,
            endDate: endDate,
        };
        if (flag2) {
            sendRequestWithPeriod(data);
        }
    });
    $("#periodEndDate").change(function () {
        flag2 = true;
        endDate = $("#periodEndDate").val();
        let data = {
            startDate: startDate,
            endDate: endDate,
        };
        if (flag1) {
            sendRequestWithPeriod(data);
        }
    });
    $("#tmpOrdersUploadButton").click(function () {
        // userId = $(this).attr("userId");
        $("#ordersFormFileUpload").click();
    });
    $("#ordersFormFileUpload").change(function () {
        var form = new FormData();
        var files = $("#ordersFormFileUpload")[0].files;
        // var rows = [];
        // const reader = new FileReader();
        // reader.onload = function (e) {
        //     const text = e.target.result;
        //     Papa.parse(text, {
        //         headers: true,
        //         complete: function (results) {
        //             rows = results.data;
        //         },
        //     });
        //     const keys = rows[4].map((cell) => cell.trim());
        //     const data = rows.slice(4).reduce((acc, row) => {
        //         const obj = {};
        //         keys.forEach((key, i) => {
        //             obj[key] = row[i];
        //         });

        //         acc.push(obj);
        //         return acc;
        //     }, []);
        //     for (let i = 0; i < data.length; i++) {
        //         console.log(data[i]);
        //     }
        // };
        // reader.readAsText(files[0]);

        if (files.length > 0) {
            form.append("file", files[0]);
            $.ajax({
                url: `/orders/orderRequest/upload/`,
                method: "POST",
                data: form,
                contentType: false,
                processData: false,
                headers: {
                    "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr(
                        "content"
                    ),
                },
                success: function (res) {
                    if (res == "success") {
                        console.log(res);
                        $("#newOrderToast").addClass("bg-success");
                        $("#newOrderToast").show();
                        setTimeout(function () {
                            $("#newOrderToast").fadeOut(1000);
                        }, 2000);
                    } else {
                        console.log(res);
                        $("#newOrderToast").addClass("bg-danger");
                        $("#newOrderToastValue").text("登録できません。");
                        $("#newOrderToast").show();
                        setTimeout(function () {
                            $("#newOrderToast").fadeOut(1000);
                        }, 2000);
                    }
                    // location.reload();
                },
                error: function (xhr, status, error) {
                    // console.log("error");
                    $("#newOrderToast").addClass("bg-danger");
                    $("#newOrderToastValue").text("登録できません。");
                    $("#newOrderToast").show();
                    setTimeout(function () {
                        $("#newOrderToast").fadeOut(1000);
                    }, 2000);
                },
            });
        }
    });

    function sendRequestWithPeriod(data) {
        $.ajax({
            url: `/orders/search`,
            method: "GET",
            data: data,
            headers: {
                "X-CSRF-TOKEN": $("meta[name='csrf-token']").attr("content"),
            },
            success: function (res, status) {
                // console.log("res=>", res);
                location.reload();
            },
            error: function (xhr, status, error) {},
        });
    }
});
