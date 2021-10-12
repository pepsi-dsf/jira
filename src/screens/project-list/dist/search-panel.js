"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.SearchPanel = void 0;
exports.SearchPanel = function (_a) {
  var users = _a.users,
    param = _a.param,
    setParam = _a.setParam;
  return React.createElement(
    "form",
    null,
    React.createElement(
      "div",
      null,
      React.createElement("input", {
        type: "text",
        value: param.name,
        onChange: function (evt) {
          return setParam(
            __assign(__assign({}, param), { name: evt.target.value })
          );
        },
      }),
      React.createElement(
        "select",
        {
          value: param.personId,
          onChange: function (evt) {
            return setParam(
              __assign(__assign({}, param), { personId: evt.target.value })
            );
          },
        },
        React.createElement("option", { value: "" }, "\u8D1F\u8D23\u4EBA"),
        users.map(function (user) {
          return React.createElement(
            "option",
            { key: user.id, value: user.id },
            user.name
          );
        })
      )
    )
  );
};
