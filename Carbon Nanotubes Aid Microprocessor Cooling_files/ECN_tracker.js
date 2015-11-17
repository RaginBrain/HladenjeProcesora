
jQuery(document).ready(function () {
    var emailID = getQueryStringByName('eid');
    var emailAddress = getQueryStringByName('emailAddress');

    if (TrackerKey != null && emailAddress != '') {
        createCookie("ECNEmailAddress", emailAddress, 365);
        init(emailAddress);
    }
    else if (TrackerKey != null && emailID != '') {
        getEmailAddress(emailID);
    }
    else {
        var emailAddress = readCookie("ECNEmailAddress");
        init(emailAddress);
    }
});

function init(emailAddress) {
    if ((emailAddress != null) && (TrackerKey != null)) {
        jQuery.ajax({
            async: true,
            type: "GET",
            url: "http://webservices.ecn5.com/DomainTracker.asmx/VerifyAccount",
            data: { TrackerKey: JSON.stringify(TrackerKey) },
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            processData: true,
            success: function (retData) {
                if (retData.d == true) {
                    GetDomainTrackerFields(emailAddress.toString());
                }
            }
        });
    }
}

function getEmailAddress(emailID) {
    jQuery.ajax({
        async: true,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://webservices.ecn5.com/DomainTracker.asmx/GetEmailAddress",
        data: { EmailID: JSON.stringify(emailID) },
        dataType: "jsonp",
        success: function (retData) {
            createCookie("ECNEmailAddress", retData.d, 365);
            init(retData.d);
        }
    });
}

function GetDomainTrackerFields(emailAddress) {
    jQuery.ajax({
        async: true,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://webservices.ecn5.com/DomainTracker.asmx/GetDomainTrackerFields",
        data: { TrackerKey: JSON.stringify(TrackerKey) },
        dataType: "jsonp",
        success: function (domainTrackerFields) {
            sendData(domainTrackerFields, emailAddress);
        }
    });
}

function sendData(domainTrackerFields, emailAddress) {
    var JSONobj = eval(domainTrackerFields);
    var domainTrackerFieldCollection = JSONobj.d;
    var sendUDFData = null;
    //Construct sendUDFData JSON here
    if (domainTrackerFieldCollection != null) {
        sendUDFData = '[';
        for (var j = 0; j < domainTrackerFieldCollection.length; j++) {
            var UDF = domainTrackerFieldCollection[j];
            sendUDFData = sendUDFData + '{"DomainTrackerFieldsID" : "' + UDF.DomainTrackerFieldsID + '" , "FieldValue" :';
            if (UDF.Source == "QueryString") {
                var result = getQueryStringByName(UDF.SourceID);
                if (result == "")
                    result = null;
                sendUDFData = sendUDFData + '"' + result + '"';
            }
            else if (UDF.Source == "Cookie") {
                var result = readCookie(UDF.SourceID);
                sendUDFData = sendUDFData + '"' + result + '"';
            }
            else if (UDF.Source == "HTMLElement") {
                var result = document.getElementById(UDF.SourceID);
                if (result == null)
                    resultValue = null;
                else
                    resultValue = result.value;
                sendUDFData = sendUDFData + '"' + resultValue + '"';
            }
            else {
                resultValue = null;
                sendUDFData = sendUDFData + '"' + resultValue + '"';
            }
            sendUDFData = sendUDFData + ', "Source": "' + UDF.Source + '", "SourceID": "' + UDF.SourceID + '"}';
            if (j < domainTrackerFieldCollection.length - 1) {
                sendUDFData = sendUDFData + ',';
            }

        }
        sendUDFData = sendUDFData + ']';
    }
    var JsonSend = eval("(" + sendUDFData + ")");
    var refURL = document.referrer;
    jQuery.ajax({
        async: true,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://webservices.ecn5.com/DomainTracker.asmx/UpdateDomainTrackerActivity",
        data: { DomainTrackerFieldCollection: sendUDFData, TrackerKey: JSON.stringify(TrackerKey), EmailAddress: JSON.stringify(emailAddress), SourceBlastID: JSON.stringify(0), ReferralURL: JSON.stringify(refURL) },
        dataType: "jsonp",
        success: function (data) {
        },
        error: function (errorObj) {
            alert(errorObj.responseText);
        }
    });
}


function getQueryStringByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}