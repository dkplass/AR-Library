/* eslint-disable */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
})(this, function() {
	"use strict";

	function applyFocusVisiblePolyfill(scope) {
		const hadKeyboardEvent = true;
		const hadFocusVisibleRecently = false;
		const hadFocusVisibleRecentlyTimeout = null;
		const inputTypesWhitelist = {
			text: true,
			search: true,
			url: true,
			tel: true,
			email: true,
			password: true,
			number: true,
			date: true,
			month: true,
			week: true,
			time: true,
			datetime: true,
			"datetime-local": true
		};

		function isValidFocusTarget(el) {
			if (
				el && 
				el !== document &&
				el.nodeName !== "HTML" &&
				el.nodeName !== "BODY" &&
				"classList" in el &&
				"contains" in el.classList
			) {
				return true;
			}

			return false;
		}

		function focusTriggersKeyboardModality(el) {
			const type = el.type;
			const tagName = el.tagName;

			if (tagName === "INPUT" && inputTypesWhitelist[type] && !el.readOnly) {
				return true;
			}

			if (tagName === "TEXTAREA" && !el.readOnly) {
				return true;
			}

			if (el.isContentEditable) {
				return true;
			}

			return false;
		}

		function addFocusVisibleClass(el) {
			if (el.classList.contains("focus-visible")) {
				return;
			}

			el.classList.add("focus-visible");
			el.setAttribute("data-focus-visible-added", "");
		}
	}
});
