var CUSTOM_EVENT = "custom_event";
var CLICK_EVENT_ACTION = "Click";
var SEND_INQUIRY_CATEGORY = "Send Inquiry";
var TAWK = 'Tawk';

function pushDataLayerData(dataLayerData) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push(function () {
        this.reset();
    });
    dataLayer.push(dataLayerData);
    return dataLayer;
}

function getAllDataAttrArr(selector) {
    var prev_page = document.referrer;
    let dataResults = $(selector).map(function () {
        let o = this;
        return Object.keys(o.dataset).reduce(function (c, v) {
            c[v] = o.dataset[v];
            return c;
        }, {})
    }).get()[0];
    dataResults['event'] = CUSTOM_EVENT;
    dataResults['eventAction'] = CLICK_EVENT_ACTION;
    dataResults['previous_page'] = prev_page ? prev_page : 'N/A';
    return dataResults;
}

function inquiryData(dataResults) {
    var prev_page = document.referrer;
    dataResults['event'] = CUSTOM_EVENT;
    dataResults['eventCategory'] = SEND_INQUIRY_CATEGORY;
    dataResults['eventAction'] = CLICK_EVENT_ACTION;
    dataResults['previous_page'] = prev_page ? prev_page : 'N/A';
    sendAnalyticsData(dataResults);
    pushDataLayerData(dataResults);
    return true;
}

function sendAnalyticsData(dataResults) {
    ga('send', {
        hitType: 'event',
        event: CUSTOM_EVENT,
        eventCategory: SEND_INQUIRY_CATEGORY,
        eventAction: (dataResults['eventLabel'] == 'Ad Inquiry') ? 'Paid Form Submission' : 'Organic Form Submission',
        eventLabel: dataResults['eventLabel'],
        eventsource: dataResults['eventsource'],
        inquiry_type: dataResults['inquiry_type'],
        course_category: dataResults['course_category'],
        course_name: dataResults['course_name'],
        previous_page: dataResults['previous_page'],
    });
    return true;
}

function sendTawkAnalyticsData(course_name = 'N/A', course_category = 'N/A') {
    var prev_page = document.referrer;
    var utm_source = readCookie('utm_source');
    var utm_medium = readCookie('utm_medium');
    var eventAction, eventLabel;
    eventAction = eventLabel = 'Organic Tawk Form Submission';
    if ((utm_source != null && utm_source.toLowerCase() == 'google') && (utm_medium != null && utm_medium.toLowerCase() == 'cpc')) {
        eventAction = eventLabel = 'Paid Tawk Form Submission';
    }
    ga('send', {
        hitType: 'event',
        event: CUSTOM_EVENT,
        eventCategory: SEND_INQUIRY_CATEGORY,
        eventAction: eventAction,
        eventLabel: eventLabel,
        eventsource: TAWK,
        inquiry_type: TAWK,
        course_category: course_category,
        course_name: course_name,
        previous_page: prev_page ? prev_page : 'N/A',
    });
    return true;
}
