// Get the modal
let datacontents;

function checkcode(data) {

    if (data.substring(0, 4) === "http")//for normal qr code what with "http" head
    {
        datacontents = data;
        document.getElementById('modal-contents').innerHTML = data;
        var mo = document.getElementById("myModal");
        mo.style.display = "block";
        document.getElementById('modal-go').addEventListener("click", event => {
            window.location.href = datacontents;
        });
        document.getElementById('modal-cancel').addEventListener("click", event => {
            var mo = document.getElementById("myModal");
            mo.style.display = "none";
        });
    }
    else {
        try {
            var dedata = window.atob(data);//decode for base64 code
            var dearray = dedata.split(",")
            var ip = $("#logo").html();
            if (dearray[0] == "LEADER_QR")//if it is leader code 
            {
                var json = JSON.stringify({ "type": 'access', "p3": dearray[1], "p4": dearray[2], "p8": dearray[3], "p5": dearray[4], "p6": dearray[5], "p7": dearray[6], "p1": ip, "p2": '_I' });
                $.ajax({
                    type: 'POST',
                    url: '../cgi-bin/qrcodeprocess.py',
                    contentType: 'application/json',
                    data: json,
                    success: function (data) {
                        var res = data.replace(/\r?\n/g, "");
                        //$(location).attr("href", res);
                        if (typeof currentStream !== 'undefined') {
                            stopMediaTracks(currentStream);
                        }
                        $(location).attr("href", res);

                        // window.open(res,'_blank');
                    }
                });
            }
            else// the other code
            {
                alert("The contents of your code is : \n" + data);
            }
        }
        catch (ex) {
            console.error("outer", ex.message);
            alert("The contents of your code is : \n" + data);
        }
    }
}
