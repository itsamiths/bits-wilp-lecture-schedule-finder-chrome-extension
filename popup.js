function onWindowLoad() {
	chrome.tabs.executeScript({
		"code" : "function getLocalStorage(){var ls = {'s1':localStorage.s1,'s2' : localStorage.s2,'s3' : localStorage.s3,'s4' : localStorage.s4};return ls;}getLocalStorage();"
	}, function (result) {
		var localStorage = result[0];
		document.getElementById('s1').value = localStorage.s1 ? localStorage.s1 : "";
		document.getElementById('s2').value = localStorage.s2 ? localStorage.s2 : "";
		document.getElementById('s3').value = localStorage.s3 ? localStorage.s3 : "";
		document.getElementById('s4').value = localStorage.s4 ? localStorage.s4 : "";
	});

	document.getElementById('highlight').addEventListener('click', myFunction);
	function myFunction() {

		var subjects = {
			s1 : document.getElementById('s1').value,
			s2 : document.getElementById('s2').value,
			s3 : document.getElementById('s3').value,
			s4 : document.getElementById('s4').value
		};
		chrome.tabs.executeScript(null, {
			file : "jquery.js"
		}, function () {
			chrome.tabs.executeScript({
				code : 'window.subjects=' + JSON.stringify(subjects)
			}, function () {
				chrome.tabs.executeScript({
					code : 'var s1 = window.subjects.s1;var s2 = window.subjects.s2;var s3 = window.subjects.s3;var s4 = window.subjects.s4;var tables = $("table");for(var i = 0; i < tables.length ; i++){var tds = $("td",tables[i]);$(tds).css("border", "1px solid rgba(0,0,0,0.2)");$(tds).css("opacity","0.2");for(var j = 0;j < tds.length ; j++){if($(tds[j]).text().toLowerCase().replace(/\s/g, "").includes(s1.toLowerCase().replace(/\s/g, ""))){$(tds[j]).css("opacity","1");}else if($(tds[j]).text().toLowerCase().replace(/\s/g, "").includes(s2.toLowerCase().replace(/\s/g, ""))){$(tds[j]).css("opacity","1");}else if($(tds[j]).text().toLowerCase().replace(/\s/g, "").includes(s3.toLowerCase().replace(/\s/g, ""))){$(tds[j]).css("opacity","1");}else if($(tds[j]).text().toLowerCase().replace(/\s/g, "").includes(s4.toLowerCase().replace(/\s/g, ""))){$(tds[j]).css("opacity","1");}}}'
				}, function () {
					chrome.tabs.executeScript({
						"code" : "function setLocalStorage(){localStorage.s1 = window.subjects.s1;localStorage.s2 = window.subjects.s2;localStorage.s3 = window.subjects.s3;localStorage.s4 = window.subjects.s4;}setLocalStorage();"
					});
					// If you try and inject into an extensions page or the webstore/NTP you'll get an error
					if (chrome.runtime.lastError) {
						message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
					}
				});
			});
		});

	};
}
window.onload = onWindowLoad;