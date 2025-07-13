var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LastTokenised = [];
var LastIgnoredTokens = [];
var OutputTokenHTML;
var ConfigTokenHTML;
var LoadedConfigModifiers = new Map();
function GetInputCommand() {
    var _a;
    var InputObject = document.querySelector("textarea#input-command");
    var InputCommand = (_a = InputObject === null || InputObject === void 0 ? void 0 : InputObject.value) === null || _a === void 0 ? void 0 : _a.trim();
    if (InputCommand == null || InputCommand == "") {
        console.warn("No input was provided.");
        return null;
    }
    return InputCommand;
}
function UpdateTokens() {
    removeUserErrors();
    ConfigTokenHTML = document.querySelector("div#tokens");
    OutputTokenHTML = document.querySelector('div#output-command');
    LastTokenised = Modifier.CommandTokenise(GetInputCommand(), document.getElementById("menu-templates"));
    if (document.getElementById("feeling-lucky"))
        document.getElementById("feeling-lucky").style.display = (LastTokenised === null || LastTokenised === void 0 ? void 0 : LastTokenised.length) > 0 ? 'none' : 'block';
    UpdateUITokens(LastTokenised);
}
function UpdateUITokens(Tokenised) {
    ConfigTokenHTML.innerHTML = "";
    OutputTokenHTML.innerHTML = "";
    Tokenised === null || Tokenised === void 0 ? void 0 : Tokenised.forEach(function (Token, Index, Array) {
        var parentElement = document.createElement('div');
        parentElement.classList.add("token-holder");
        ConfigTokenHTML.appendChild(parentElement);
        var OutputTokenElement = document.createElement('span');
        var ConfigTokenElement = document.createElement('div');
        var SpaceElement = document.createElement('span');
        SpaceElement.innerHTML = "&nbsp;";
        ConfigTokenElement.classList.add("token");
        parentElement.appendChild(ConfigTokenElement);
        OutputTokenHTML.appendChild(OutputTokenElement);
        Token.SetElements(ConfigTokenElement, OutputTokenElement);
        if (Index < Array.length - 1 && !Modifier.ValueChars.some(function (y) { return Token.GetContent().reverse()[0] == y; })) {
            OutputTokenHTML.appendChild(SpaceElement);
        }
    });
}
function ApplyObfuscation() {
    removeUserErrors();
    if (LastTokenised == null || (LastTokenised === null || LastTokenised === void 0 ? void 0 : LastTokenised.length) <= 0) {
        UpdateTokens();
        if (LastTokenised == null || (LastTokenised === null || LastTokenised === void 0 ? void 0 : LastTokenised.length) <= 0) {
            logUserError("empty-input", "No input to apply obfuscation to. Provide a command in the above box to get started.", true);
            return;
        }
    }
    LastTokenised === null || LastTokenised === void 0 ? void 0 : LastTokenised.forEach(function (Token) { return Token.Reset(); });
    var SelectedOptions = document.querySelectorAll("input[data-function][id^=\"option-\"]:checked");
    if ((SelectedOptions === null || SelectedOptions === void 0 ? void 0 : SelectedOptions.length) <= 0) {
        logUserError("pattern-no-options", "There are no transformations enabled in the options section below; without this, no obfuscation will be applied.", true);
    }
    SelectedOptions.forEach(function (Element) {
        var ClassName = Element.dataset.function;
        var ClassInstance = Object.create(window[ClassName].prototype);
        var IncludedTypes = JSON.parse(document.getElementById(Element.id + "_arg0").dataset.included_types);
        var ClassInstanceArguments = [LastTokenised, IncludedTypes];
        var SelectedOptionArguments = document.querySelectorAll("input[id^=\"" + Element.id + "_arg\"], textarea[id^=\"" + Element.id + "_arg\"]");
        SelectedOptionArguments.forEach(function (OptionElement) {
            ClassInstanceArguments.push((OptionElement instanceof HTMLInputElement && OptionElement.type == 'checkbox') ? OptionElement.checked : OptionElement.value);
        });
        ClassInstance.constructor.apply(ClassInstance, ClassInstanceArguments);
        ClassInstance.GenerateOutput();
    });
}
function GenerateObfuscationOptionsHTML() {
    var modifiers = Modifier.GetAllModifiers();
    var target = document.getElementById('options-panel-options');
    var _loop_1 = function (modifierID) {
        var modifier = modifiers[modifierID];
        modifierID = modifierID.toLowerCase();
        var modifierBox = document.createElement('div');
        modifierBox.classList.add("option");
        modifierBox.id = modifier.Function.name;
        var modifierBoxBody = document.createElement('div');
        modifierBoxBody.classList.add('body');
        modifierBoxBody.innerHTML = "<input type=\"checkbox\" id=\"option-".concat(modifierID, "\" data-function=\"").concat(modifier.Function.name, "\" />\n        <label for=\"option-").concat(modifierID, "\">Enable <a class=\"explain\" title=\"").concat(modifier.Description, "\">").concat(modifier.Name, "</a></label>");
        var modifierBoxBodySubOptions = document.createElement('div');
        modifierBoxBodySubOptions.classList.add('suboptions');
        var modifierBoxBodySubOptionsRow = document.createElement('div');
        modifierBoxBodySubOptionsRow.classList.add('flex-row');
        modifierBoxBodySubOptionsRow.innerHTML = "<label for=\"option-".concat(modifierID, "_arg0\">Apply to</label>\n        <div class=\"picker\"><div class=\"option-target button\" id=\"option-").concat(modifierID, "_arg0\"\n            data-included_types=\"\"></div></div>\n            &nbsp;<label for=\"option-").concat(modifierID, "_arg1\">with a probability of</label><input\n            type=\"number\" id=\"option-").concat(modifierID, "_arg1\" data-field=\"Probability\"\n            class=\"probs-slider\" value=\"0.5\" min=\"0\" max=\"1\" step=\"0.1\">");
        modifierBoxBodySubOptionsRow.querySelector("div#option-".concat(modifierID, "_arg0")).dataset['included_types'] = JSON.stringify(modifier.DefaultIncludedTypes);
        modifierBoxBodySubOptions.appendChild(modifierBoxBodySubOptionsRow);
        var i = 2;
        var modifierBoxBodySubOptionsRow2 = document.createElement('div');
        modifierBoxBodySubOptionsRow2.classList.add('flex-row');
        modifier.Arguments.forEach(function (argument) {
            var modifierBoxBodySubOptionsRow3 = document.createElement('div');
            modifierBoxBodySubOptionsRow3.classList.add("suboption");
            var label = "<label for=\"option-".concat(modifierID, "_arg").concat(i, "\">").concat(argument.PublicName, "</label>");
            if (argument.Type == "text-a") {
                modifierBoxBodySubOptionsRow3.innerHTML += label + "<input type=\"text\" id=\"option-".concat(modifierID, "_arg").concat(i, "\" data-field=\"").concat(argument.InternalName, "\" data-type=\"array\" placeholder=\"").concat(argument.Description, "\" value=\"\" />");
            }
            else if (argument.Type == "text-s") {
                modifierBoxBodySubOptionsRow3.innerHTML += label + "<input type=\"text\" id=\"option-".concat(modifierID, "_arg").concat(i, "\" data-field=\"").concat(argument.InternalName, "\" data-type=\"string\" placeholder=\"").concat(argument.Description, "\" value=\"\" />");
            }
            else if (argument.Type == "number") {
                modifierBoxBodySubOptionsRow3.innerHTML += label + "<input type=\"number\" id=\"option-".concat(modifierID, "_arg").concat(i, "\" data-field=\"").concat(argument.InternalName, "\" placeholder=\"").concat(argument.Description, "\" title=\"").concat(argument.Description, "\" value=\"\" />");
            }
            else if (argument.Type == "checkbox") {
                modifierBoxBodySubOptionsRow3.innerHTML += "<input data-field=\"".concat(argument.InternalName, "\" type=\"checkbox\" id=\"option-").concat(modifierID, "_arg").concat(i, "\"></input>") + label;
            }
            else if (argument.Type == "textarea") {
                modifierBoxBodySubOptionsRow3.innerHTML += label + "<textarea data-field=\"".concat(argument.InternalName, "\" id=\"option-").concat(modifierID, "_arg").concat(i, "\" placeholder=\"").concat(argument.Description, "\"></textarea>");
            }
            modifierBoxBodySubOptionsRow2.appendChild(modifierBoxBodySubOptionsRow3);
            i++;
        });
        modifierBoxBodySubOptions.appendChild(modifierBoxBodySubOptionsRow2);
        modifierBoxBody.appendChild(modifierBoxBodySubOptions);
        var modifierBoxDrag = document.createElement('div');
        modifierBoxDrag.classList.add("drag");
        modifierBoxDrag.innerText = "⠿";
        modifierBox.appendChild(modifierBoxBody);
        modifierBox.appendChild(modifierBoxDrag);
        target.appendChild(modifierBox);
    };
    for (var modifierID in modifiers) {
        _loop_1(modifierID);
    }
    ;
}
function ResetForm() {
    var _a;
    document.querySelectorAll('input[type=text], input[type=file]').forEach(function (x) { return x.value = x.defaultValue; });
    document.querySelectorAll('input[type=checkbox]').forEach(function (x) { x.checked = x.defaultChecked; x.dispatchEvent(new Event("change")); });
    document.querySelectorAll('textarea').forEach(function (x) { x.value = x.defaultValue; x.dispatchEvent(new Event("keyup")); });
    (_a = document.getElementById("menu-templates")) === null || _a === void 0 ? void 0 : _a.children[0].dispatchEvent(new Event("click"));
}
function addEnterListener(target) {
    if (!target)
        return;
    target.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === 'Enter')
            event.target.click();
    });
}
function OnLoad() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    window.removeEventListener("DOMContentLoaded", OnLoad, false);
    if (!document.querySelector("div#tokens"))
        return;
    UpdateTokens();
    GenerateObfuscationOptionsHTML();
    (_a = document.getElementById("format-picker")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", FetchJsonFile);
    (_b = document.getElementById("json-file")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", ReadJsonFile);
    (_c = document.getElementById("input-command")) === null || _c === void 0 ? void 0 : _c.addEventListener("keyup", debounce(UpdateTokens, 1000));
    (_d = document.getElementById("input-command")) === null || _d === void 0 ? void 0 : _d.addEventListener("paste", function () { return setTimeout(UpdateTokens, 0); });
    (_e = document.getElementById("obfuscation-run")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () { return ApplyObfuscation(); });
    addEnterListener(document.getElementById("obfuscation-run"));
    (_f = document.getElementById("download-config")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", GenerateConfigJsonFile);
    addEnterListener(document.getElementById("download-config"));
    (_g = document.getElementById("reset-form")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", ResetForm);
    addEnterListener(document.getElementById("reset-form"));
    (_h = document.getElementById("feeling-lucky")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", function (x) {
        var jsons = Array.from(document.getElementById('menu-templates').querySelectorAll("li[data-target]")).map(function (x) { var _a; return (_a = x.dataset) === null || _a === void 0 ? void 0 : _a.target; });
        var json = jsons[Math.floor(Math.random() * jsons.length)];
        fetch(json, { headers: { "Content-Type": "application/json; charset=utf-8" } })
            .then(function (res) { return res.text(); })
            .then(function (response) {
            ApplyTemplate(JSON.parse(response), true);
            document.getElementById("feeling-lucky").style.display = 'none';
        })
            .catch(function (err) {
            throw err;
        });
    });
    if (document.getElementById("input-command").dataset.target !== undefined) {
        FetchJsonFileContents(document.getElementById("input-command").dataset.target, null).then(function (newModifiers) {
            ApplyTemplate({ modifiers: newModifiers }, false);
            document.querySelectorAll("code[data-process]").forEach(function (x) {
                var ID = document.querySelector("input[data-function=\"".concat(x.dataset.process, "\"]")).id;
                var ClassInstance = Object.create(window[x.dataset.process].prototype);
                var ClassInstanceArguments = [null, null];
                var SelectedOptionArguments = document.querySelectorAll("input[id^=\"" + ID + "_arg\"], textarea[id^=\"" + ID + "_arg\"]");
                SelectedOptionArguments.forEach(function (OptionElement) {
                    ClassInstanceArguments.push((OptionElement instanceof HTMLInputElement && OptionElement.type == 'checkbox') ? OptionElement.checked : OptionElement.value);
                });
                var y = ClassInstance.constructor.apply(ClassInstance, ClassInstanceArguments);
                var obfuscated = y.TestRun(x.innerText);
                if (obfuscated) {
                    x.innerText = obfuscated;
                    x.parentElement.classList.remove("collapsed");
                    var firstChar = obfuscated.charCodeAt(0);
                    if (firstChar > 255) {
                        var a = document.createElement("a");
                        a.href = "https://unicode-explorer.com/c/".concat(firstChar.toString(16).toUpperCase());
                        a.target = "_blank";
                        a.innerText = "U+".concat(firstChar.toString(16).toUpperCase());
                        var text = document.createTextNode(" (using character ");
                        x.parentElement.insertBefore(text, x.nextSibling);
                        x.parentElement.insertBefore(a, text.nextSibling);
                        x.parentElement.insertBefore(document.createTextNode(")"), a.nextSibling);
                    }
                }
            });
        });
    }
    (_j = document.getElementById("button-template")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", function (_) { return ShowContextMenu(document.getElementById('menu-templates'), document.getElementById('button-template')); });
    addEnterListener(document.getElementById("button-template"));
    (_k = document.getElementById("button-template")) === null || _k === void 0 ? void 0 : _k.addEventListener('keyup', function (e) {
        var _a;
        if (e.key >= 'a' && e.key <= 'z') {
            var finds = __spreadArray([], Array.from((_a = document.getElementById('menu-templates')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('li')), true).filter(function (i) { return i.innerText.toLowerCase().startsWith(e.key); })[0];
            if (finds !== undefined)
                finds.scrollIntoView();
        }
    });
    ;
    (_l = document.getElementById('menu-templates')) === null || _l === void 0 ? void 0 : _l.childNodes.forEach(function (ContextMenuItem) {
        ContextMenuItem.addEventListener("click", function (e) {
            var currentSelected = document.querySelector("#menu-templates>li[data-active='true']");
            FetchJsonFile2(currentSelected).then(function (oldDefaultModifiers) {
                return FetchJsonFile2(ContextMenuItem).then(function (newModifiers) {
                    if (CheckChanged(ContextMenuItem, newModifiers, oldDefaultModifiers)) {
                        ContextMenuItem.parentNode.childNodes.forEach(function (x) { x.ariaSelected = 'false'; if (x.dataset)
                            x.dataset['active'] = ""; });
                        if (!ContextMenuItem.dataset['function']) {
                            ApplyTemplate({ modifiers: newModifiers }, false);
                            ContextMenuItem.dataset['active'] = 'true';
                            ContextMenuItem.ariaSelected = 'true';
                            document.getElementById("template-selected").innerText = ContextMenuItem.innerText;
                        }
                        else
                            document.getElementById("template-selected").innerText = "(none)";
                        document.dispatchEvent(new MouseEvent("mousedown", { clientX: 1, clientY: 1, bubbles: true }));
                    }
                });
            });
        });
    });
    document.querySelectorAll("fieldset.collapsible").forEach(function (x) {
        var legend = x.querySelector("legend");
        var span = document.createElement("span");
        var content = x.children[1];
        span.innerText = content.classList.contains("collapsed") ? "▶" : "▼";
        legend.prepend(span);
        legend.addEventListener("click", function () {
            if (content.classList.contains("collapsed"))
                content.classList.remove("collapsed");
            else
                content.classList.add("collapsed");
            span.innerText = content.classList.contains("collapsed") ? "▶" : "▼";
        });
    });
    document.querySelectorAll(".button-toggle").forEach(function (x) {
        var target = document.getElementById(x.dataset.target);
        x.addEventListener("click", function (_) {
            if (target.classList.contains("collapsed")) {
                target.classList.remove("collapsed");
                x.innerHTML = x.innerHTML.replace('Show', 'Hide');
            }
            else {
                target.classList.add("collapsed");
                x.innerHTML = x.innerHTML.replace('Hide', 'Show');
            }
        });
    });
    document.querySelectorAll(".option-target").forEach(function (ContextMenuButton) {
        var ContextMenu = document.getElementsByClassName("context-menu")[0].cloneNode(true);
        ContextMenu.removeChild(ContextMenu.children[0]);
        ContextMenuButton.parentNode.insertBefore(ContextMenu, ContextMenuButton.nextSibling);
        Array.from(ContextMenu.children).forEach(function (ContextMenuItem) {
            ContextMenuItem.addEventListener("click", function (e) {
                ContextMenuItem.dataset.active = (ContextMenuItem.dataset.active == "true" ? "" : "true");
                var IncludedTypes = JSON.parse(ContextMenuButton.dataset.included_types);
                if (ContextMenuItem.dataset.active == "true")
                    IncludedTypes.push(ContextMenuItem.dataset.type);
                else
                    IncludedTypes = IncludedTypes.filter(function (item) { return item !== ContextMenuItem.dataset.type; });
                ContextMenuButton.dataset.included_types = JSON.stringify(IncludedTypes);
                ContextMenuButton.innerText = UpdateExcludeText(ContextMenuButton, ContextMenu);
            });
        });
        ContextMenuButton.innerText = UpdateExcludeText(ContextMenuButton, ContextMenu);
        ContextMenuButton.addEventListener("click", function (_) { return ShowContextMenu(ContextMenu, ContextMenuButton); });
    });
    document.querySelectorAll("input[id^=\"option-\"]").forEach(function (p) {
        p.addEventListener("change", function (_) {
            if (p.parentElement) {
                var suboptions = p.parentElement.querySelector("div.suboptions");
                if (!p.checked) {
                    p.parentElement.classList.remove('selected');
                    if (suboptions)
                        suboptions.style.display = "none";
                }
                else {
                    p.parentElement.classList.add('selected');
                    if (suboptions)
                        suboptions.style.display = "flex";
                }
            }
        });
        p.dispatchEvent(new Event("change"));
    });
    slist(document.getElementById("options-panel-options"));
}
;
document.addEventListener("DOMContentLoaded", OnLoad, false);
function slist(target) {
    target.classList.add("slist");
    function getOptionItems() { return target.querySelectorAll(".slist>div>.drag"); }
    var items = getOptionItems(), current = null, eventTarget = null;
    var _loop_2 = function (i) {
        i.draggable = true;
        i.ondragstart = function () {
            current = i.parentElement;
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var it = items_2[_i];
                if (it.parentElement != current) {
                    it.parentElement.classList.add("hint");
                }
            }
        };
        i.ondragenter = function (event) {
            eventTarget = event.target;
            event.stopPropagation();
            event.preventDefault();
            if (i.parentElement != current) {
                i.parentElement.classList.add("active");
            }
        };
        i.ondragleave = function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (eventTarget == event.target)
                i.parentElement.classList.remove("active");
        };
        i.ondragend = function () {
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var it = items_3[_i];
                it.parentElement.classList.remove("hint");
                it.parentElement.classList.remove("active");
            }
        };
        i.ondragover = function (event) { return event.preventDefault(); };
        i.ondrop = function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (i.parentElement != current) {
                var currentpos = 0, droppedpos = 0, items_4 = getOptionItems();
                for (var it = 0; it < items_4.length; it++) {
                    if (current == items_4[it].parentElement) {
                        currentpos = it;
                    }
                    if (i.parentElement == items_4[it].parentElement) {
                        droppedpos = it;
                    }
                }
                if (currentpos < droppedpos) {
                    i.parentElement.parentNode.insertBefore(current, i.parentElement.nextSibling);
                }
                else {
                    i.parentElement.parentNode.insertBefore(current, i.parentElement);
                }
            }
        };
    };
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var i = items_1[_i];
        _loop_2(i);
    }
}
function moveItem(current, newPosition) {
    var items = Array.from(current.parentElement.childNodes).filter(function (x) { return x.nodeType == 1; });
    current.parentNode.insertBefore(current, items[newPosition]);
}
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
;
function getUserErrors() {
    var result = new Map();
    var error_messages = document.getElementById("error-messages");
    error_messages.childNodes.forEach(function (x) { return result.set(x.dataset.error_id, x); });
    return result;
}
function logUserError(id, message, error) {
    if (error === void 0) { error = false; }
    (error ? console.error : console.warn)(message);
    var error_messages = document.getElementById("error-messages");
    if (!getUserErrors().has(id)) {
        var error_message = document.createElement("div");
        error_message.innerHTML = "<strong> ".concat(error ? "🔴 Error" : "🟠 Warning", ":</strong> ").concat(message);
        error_message.dataset.error_id = id;
        error_messages.append(error_message);
    }
}
function removeUserErrors() {
    if (document.getElementById("error-messages"))
        document.getElementById("error-messages").innerHTML = "";
}
function SetPosition(Parent, ContextMenu) {
    var box = Parent.getBoundingClientRect();
    ContextMenu.style.top = (box.height / 2) + "px";
}
function ShowContextMenu(Element, ClickElement) {
    var _a;
    if (Element.style.display == "block") {
        Element.style.display = 'none';
        ClickElement.ariaExpanded = 'false';
        ClickElement.setAttribute('aria-activedescendant', "");
    }
    else {
        SetPosition(ClickElement, Element);
        Element.style.display = 'block';
        ClickElement.ariaExpanded = 'true';
        ClickElement.setAttribute('aria-activedescendant', ((_a = Element.querySelector('li[aria-selected=true]')) === null || _a === void 0 ? void 0 : _a.id) || "");
        var ClickHandler = function (evt) {
            var Target = evt.target;
            if (!Element.contains(Target))
                window.removeEventListener('mousedown', ClickHandler);
            if (!Element.contains(Target) && Target != ClickElement && !ClickElement.contains(Target))
                ClickElement.dispatchEvent(new Event("click"));
        };
        window.addEventListener('mousedown', ClickHandler);
    }
}
function UpdateExcludeText(ContextMenuButton, ContextMenu) {
    var IncludedTypes = JSON.parse(ContextMenuButton.dataset.included_types);
    Array.from(ContextMenu.children).forEach(function (ContextMenuItem) { ContextMenuItem.dataset.active = (IncludedTypes.includes(ContextMenuItem.dataset.type) ? "true" : ""); });
    if (IncludedTypes.length == 0) {
        return "nothing";
    }
    else if (IncludedTypes.length >= ContextMenu.children.length) {
        return "everything";
    }
    else if (IncludedTypes.length < (ContextMenu.children.length / 2)) {
        var IncludedTypeNames = Array.from(ContextMenu.children).filter(function (x) { return IncludedTypes.includes(x.dataset.type); }).map(function (x) { return x.innerText + "s"; });
        return IncludedTypeNames.join(", ") + " only";
    }
    else {
        var IncludedTypeNames = Array.from(ContextMenu.children).filter(function (x) { return !IncludedTypes.includes(x.dataset.type); }).map(function (x) { return x.innerText + "s"; });
        return "everything except " + IncludedTypeNames.join(", ");
    }
}
function FetchJsonFile() {
    if (this.selectedIndex == 0)
        return;
    else if (this.selectedIndex == 1) {
        document.getElementById("json-file").click();
    }
    else {
        var name_1 = this.value.replace('.exe', '.json');
        fetch("assets/models/" + name_1, { headers: { "Content-Type": "application/json; charset=utf-8" } })
            .then(function (res) { return res.text(); })
            .then(function (response) {
            ApplyTemplate(JSON.parse(response), false);
        })
            .catch(function (err) {
            throw err;
        });
    }
}
function ObjectEquals(object_a, object_b) {
    if ((object_a == null && object_b != null) || (object_a != null && object_b == null))
        return false;
    if (JSON.stringify(Object.keys(object_a)) != JSON.stringify(Object.keys(object_b)))
        return false;
    var entries_a = new Map(Object.entries(object_a));
    var entries_b = new Map(Object.entries(object_b));
    return Object.keys(object_a).every(function (key) {
        var properties_a = new Map(Object.entries(entries_a.get(key)));
        var properties_b = new Map(Object.entries(entries_b.get(key)));
        return Object.keys(entries_a.get(key)).every(function (subkey) { return JSON.stringify(properties_a.get(subkey)) == JSON.stringify(properties_b.get(subkey)); });
    });
}
function CheckChanged(targetElem, newModifiers, oldDefaultModifiers) {
    var SelectedOptions = document.querySelectorAll("input[data-function][id^=\"option-\"]:checked");
    var warningText = "You made changes to the default obfuscation options, but the new command you entered has different obfuscation settings.\nAre you sure you want to lose the changes you made?\n\nPress OK to discard your changes and apply the new configuration, or click Cancel to keep your configuration.";
    if (targetElem.dataset.keys !== undefined && targetElem.dataset.keys.includes("function") && (SelectedOptions === null || SelectedOptions === void 0 ? void 0 : SelectedOptions.length) > 0) {
        return confirm(warningText);
    }
    if (targetElem.innerText != document.getElementById('template-selected').innerText) {
        var currentConfig = GetJsonContents();
        if (Object.keys(currentConfig).length === 0
            || ObjectEquals(newModifiers, currentConfig)
            || ObjectEquals(oldDefaultModifiers, currentConfig)) {
            return true;
        }
        else {
            return confirm(warningText);
        }
    }
    else {
        return false;
    }
}
function FetchJsonFile2(elem) {
    return __awaiter(this, void 0, void 0, function () {
        var name_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (elem == null || elem.dataset['function'] == 'none')
                        return [2, new Promise(function (resolve) { resolve(null); })];
                    if (LoadedConfigModifiers.has(elem.dataset.target))
                        return [2, new Promise(function (resolve) { resolve(LoadedConfigModifiers.get(elem.dataset.target)); })];
                    if (!(elem.dataset['function'] == 'upload')) return [3, 1];
                    document.getElementById("json-file").click();
                    return [2, new Promise(function (resolve) { resolve(null); })];
                case 1:
                    name_2 = elem.dataset.target;
                    return [4, FetchJsonFileContents(name_2, elem)];
                case 2: return [2, _a.sent()];
            }
        });
    });
}
function FetchJsonFileContents(name, elem) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(name, { headers: { "Content-Type": "application/json; charset=utf-8" } })
                        .then(function (res) {
                        if (!res.ok)
                            throw new Error("Unexpected status code ".concat(res.status));
                        return res.text();
                    })
                        .then(function (response) {
                        var result = JSON.parse(response).modifiers;
                        if (elem != null)
                            LoadedConfigModifiers.set(elem.innerText, result);
                        return result;
                    })
                        .catch(function (err) {
                        logUserError("http-error", "Could not fetch template: ".concat(err), true);
                        throw err;
                    })];
                case 1:
                    response = _a.sent();
                    return [2, response];
            }
        });
    });
}
function ReadJsonFile() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            ApplyTemplate(JSON.parse(evt.target.result), true);
            UpdateTokens();
        };
        reader.onerror = function (evt) {
            document.getElementById("fileContents").innerHTML = "error reading file";
        };
    }
}
function ApplyTemplate(Input, Interactive) {
    var CommandOutput = document.getElementById("input-command");
    document.querySelectorAll("input[id^=\"option-\"]:checked").forEach(function (p) { return p.click(); });
    var CurrentCommand = GetInputCommand();
    if (Object.keys(Input.modifiers).length == 0)
        logUserError("pattern-no-options", "Bummer! It looks like this executable does not have any known obfuscation options.", true);
    var NewCommand = null;
    if (Input.command)
        NewCommand = Input.command.map(function (Token, index) {
            var prefix = "";
            if (index > 0) {
                var PreviousToken_1 = Object.entries(Input.command[index - 1]);
                if (!(PreviousToken_1[0][0] == 'argument' && Modifier.ValueChars.some(function (x) { return PreviousToken_1[0][1].endsWith(x.toString()); }))) {
                    prefix = Modifier.SeparationChar.toString();
                }
            }
            return prefix + Object.entries(Token)[0][1];
        }).join("");
    if (Interactive && NewCommand && (CurrentCommand == null || CurrentCommand == '' || CurrentCommand == NewCommand || confirm('Would you like to replace the existing command with the command that is embedded in the provided config file?\n(Clicking "Cancel" will still apply all obfuscation options)'))) {
        CommandOutput.textContent = '';
        CommandOutput.value = NewCommand;
        LastTokenised = [];
        Input.command.forEach(function (Entry) {
            var TokenContent = Object.entries(Entry)[0][1];
            var Type = Object.entries(Entry)[0][0];
            var t = new Token(TokenContent.split(''));
            t.SetType(Type);
            LastTokenised.push(t);
        });
        UpdateUITokens(LastTokenised);
    }
    document.querySelectorAll("input[id^=\"option-\"]:checked").forEach(function (x) { return x.click(); });
    document.querySelectorAll("div[data-included_types]").forEach(function (ContextMenuButton) { ContextMenuButton.dataset.included_types = "[]"; ContextMenuButton.innerText = UpdateExcludeText(ContextMenuButton, ContextMenuButton.nextSibling); });
    var i = 0;
    Object.entries(Input.modifiers).forEach(function (_a) {
        var ModifierName = _a[0], m = _a[1];
        var ModifierObject = document.getElementById("option-" + ModifierName.toLowerCase());
        if (ModifierObject == null) {
            console.warn("Could not find modifier \"".concat(ModifierName, "\""));
            return;
        }
        ModifierObject.click();
        moveItem(ModifierObject.parentElement.parentElement, i++);
        Object.entries(m).forEach(function (_a) {
            var Option = _a[0], value = _a[1];
            if (Option == "AppliesTo") {
                var ContextMenuButton = document.querySelector("#" + ModifierName + " div[data-included_types]");
                var ContextMenu = document.querySelector("#" + ModifierName + " menu");
                ContextMenuButton.dataset.included_types = JSON.stringify(value);
                ContextMenuButton.innerText = UpdateExcludeText(ContextMenuButton, ContextMenu);
            }
            else {
                var SettingObject = document.querySelector("#" + ModifierName + " input[data-field='" + Option + "'], textarea[data-field='" + Option + "']");
                if (!SettingObject)
                    console.warn("Could not apply option ".concat(Option, " on modifier ").concat(ModifierName));
                else {
                    if (SettingObject instanceof HTMLInputElement && SettingObject.type == 'checkbox')
                        SettingObject.checked = value;
                    else if (SettingObject.type == 'textarea')
                        SettingObject.value = value;
                    else if (Array.isArray(value))
                        SettingObject.value = value.join('');
                    else
                        SettingObject.value = value;
                    SettingObject.dispatchEvent(new Event("input"));
                }
            }
        });
    });
}
function GetJsonContents() {
    var modifiers = new Map();
    document.querySelectorAll("input[type=checkbox][data-function]:checked").forEach(function (x) {
        var dataFunction = x.dataset['function'];
        var settings = new Map();
        settings.set('AppliesTo', JSON.parse(x.parentNode.querySelector("div[data-included_types]").dataset.included_types));
        x.parentNode.querySelectorAll("input[data-field], textarea[data-field]").forEach(function (y) {
            var result = undefined;
            if (y.type == "checkbox")
                result = y.checked;
            else if (y.type == "range")
                result = Number(y.value);
            else if (y.dataset.type == "array")
                result = y.value.split('');
            else
                result = y.value;
            settings.set(y.dataset.field, result);
        });
        modifiers.set(dataFunction, Object.fromEntries(settings.entries()));
    });
    return Object.fromEntries(modifiers.entries());
}
var jsonEscapeNonAsci = function (input) { return __spreadArray([], Array.from(input), true).map(function (c) { return /^[\x20-\x7f]$/.test(c) ? c : c.split("").map(function (a) { return "\\u" + a.charCodeAt(0).toString(16).padStart(4, "0"); }).join(""); }).join(""); };
function GenerateConfigJsonFile() {
    removeUserErrors();
    if (LastTokenised == null || (LastTokenised === null || LastTokenised === void 0 ? void 0 : LastTokenised.length) <= 0)
        LastTokenised = [];
    LastTokenised.forEach(function (Token) { return Token.Reset(); });
    var tokens = LastTokenised.map(function (x) { var result = new Map(); result.set(x.GetType(), x.GetStringContent()); return Object.fromEntries(result.entries()); });
    var modifiers = GetJsonContents();
    if (Object.keys(modifiers).length == 0) {
        alert("You haven't specified any output options, so there is nothing to download at this stage. Specify some obfuscation options first.");
    }
    else {
        this.download = ((LastTokenised && LastTokenised.length > 0) ? (LastTokenised[0].GetStringContent().split(/[\\\/]/).slice(-1)[0]) : "unspecified") + ".json";
        this.href = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(jsonEscapeNonAsci(JSON.stringify({ "command": tokens, "modifiers": modifiers })))));
    }
}
function TokenEquals(array1, array2) {
    return array1.GetContent().length === array1.GetContent().length && array1.GetContent().every(function (value, index) { return CharEquals(value, array1.GetContent()[index]); });
}
function CharEquals(char1, char2) {
    return char1.toString() == char2.toString();
}
var ModifierDefinition = (function () {
    function ModifierDefinition(init) {
        this.Arguments = [];
        Object.assign(this, init);
    }
    return ModifierDefinition;
}());
var ModifierArgumentsDefinition = (function () {
    function ModifierArgumentsDefinition(init) {
        Object.assign(this, init);
    }
    return ModifierArgumentsDefinition;
}());
var Modifier = (function () {
    function Modifier(InputCommand, IncludedTypes, Probability) {
        var _a;
        this.InputCommandTokens = [];
        this.IncludedTypes = [];
        this.InputCommandTokens = InputCommand;
        (_a = this.IncludedTypes).push.apply(_a, IncludedTypes);
        this.Probability = Modifier.ParseProbability(Probability);
    }
    Modifier.CoinFlip = function (probability) {
        return Math.random() > 1 - probability;
    };
    Modifier.ChooseRandom = function (options) {
        return options[Math.floor(Math.random() * options.length)];
    };
    Modifier.RandomString = function (length) {
        var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return __spreadArray([], Array(length), true).reduce(function (a) { return a + p[~~(Math.random() * p.length)]; }, '');
    };
    Modifier.CommandTokenise = function (InputCommand, FormatPicker) {
        var _this = this;
        var _a, _b, _c;
        if (InputCommand == null)
            return null;
        var InQuote = null;
        var InOptionChar = null;
        var Tokens = [];
        var TokenContent = [];
        var SeenValueChar = false;
        var _loop_3 = function () {
            if (TokenContent.length == 0)
                SeenValueChar = false;
            var Char = new String(InputCommand[i]);
            InOptionChar = (TokenContent.length == 0 && Modifier.CommonOptionChars.some(function (y) { return y == Char; })) ? true : InOptionChar;
            if (InQuote == null && (Char == this_1.SeparationChar || (!SeenValueChar && (i == InputCommand.length || !(['\\', '/'].some(function (x) { return x == InputCommand[i + 1]; }))) && this_1.ValueChars.some(function (x) { return x == Char; })))) {
                if (Char != this_1.SeparationChar)
                    TokenContent.push(Char);
                if (Token.length > 0)
                    Tokens.push(new Token(TokenContent));
                TokenContent = [];
                InOptionChar = false;
            }
            else {
                if (InQuote != null && Char.toString() == (InQuote === null || InQuote === void 0 ? void 0 : InQuote.toString()))
                    InQuote = null;
                else if (InQuote == null && this_1.QuoteChars.some(function (x) { return x == Char; }))
                    InQuote = Char;
                TokenContent.push(Char);
            }
            SeenValueChar = SeenValueChar || this_1.ValueChars.some(function (x) { return x == Char; });
        };
        var this_1 = this;
        for (var i = 0; i < InputCommand.length; i++) {
            _loop_3();
        }
        if ((Token === null || Token === void 0 ? void 0 : Token.length) > 0)
            Tokens.push(new Token(TokenContent));
        Tokens[0].SetType("command");
        if (((_a = document.getElementById("input-command")) === null || _a === void 0 ? void 0 : _a.dataset.program) !== undefined) {
            var expectedProgram = (_c = (_b = document.getElementById("input-command")) === null || _b === void 0 ? void 0 : _b.dataset.program) === null || _c === void 0 ? void 0 : _c.split(".")[0];
            if (!Tokens[0].GetStringContent().toLowerCase().includes(expectedProgram.toLowerCase())) {
                logUserError("unexpected-program", "Are you sure you pasted a valid <code>".concat(expectedProgram, "</code> command? To obfuscate the command-line arguments of other executables, click <a href=\"/\">here</a>."));
            }
        }
        if (FormatPicker != null) {
            var i_1 = 0;
            var found_1 = false;
            var token_1 = Tokens[0].GetStringContent();
            if (token_1.includes('\\')) {
                var parts = token_1.split('\\');
                token_1 = parts[parts.length - 1];
            }
            if (token_1.toLowerCase() == 'cmd.exe' || token_1.toLowerCase() == 'cmd') {
                var commandIndex = Tokens.findIndex(function (x) { return x.GetStringContent().match(/^\/c$/i); });
                if (commandIndex > 0) {
                    logUserError("pattern-cmd", '<code>cmd.exe</code> requires special obfuscation - please check out the <a href="https://github.com/danielbohannon/Invoke-DOSfuscation" target="_blank">Invoke-Dosfuscation project</a> for this! Below are the results for obfuscating the \'inner\' command.');
                    if (Tokens[commandIndex + 1].GetContent()[0] == '"') {
                        var command = Tokens[commandIndex + 1].GetStringContent();
                        return Modifier.CommandTokenise(command.slice(1, command.length - 1), FormatPicker);
                    }
                    else {
                        return Modifier.CommandTokenise(Tokens.slice(commandIndex + 1).map(function (y) { return y.GetStringContent(); }).join(this.SeparationChar), FormatPicker);
                    }
                }
                else {
                    logUserError("pattern-cmd-2", '<code>cmd.exe</code> requires special obfuscation - please checkout the <a href="https://github.com/danielbohannon/Invoke-DOSfuscation" target="_blank">Invoke-Dosfuscation project</a> for this!');
                }
            }
            FormatPicker === null || FormatPicker === void 0 ? void 0 : FormatPicker.childNodes.forEach(function (x) {
                if ([token_1.toLowerCase(), token_1.toLowerCase() + ".exe"].find(function (y) { var _a; return y == x.textContent.toLowerCase() || (x instanceof HTMLElement && y == ((_a = x.dataset["alias"]) === null || _a === void 0 ? void 0 : _a.toLowerCase())); })) {
                    found_1 = true;
                    x.dispatchEvent(new Event("click"));
                }
                i_1++;
            });
            if (token_1.toLowerCase() == 'cmd.exe' || token_1.toLowerCase() == 'cmd')
                return;
            if (token_1.toLowerCase() == 'powershell.exe' || token_1.toLowerCase() == 'powershell' || token_1.toLowerCase() == 'pwsh.exe' || token_1.toLowerCase() == 'pwsh')
                logUserError("pattern-cmd", 'We will proceed with obfuscating the provided PowerShell command-line arguments, but not any PowerShell code, as this goes beyond the scope of this project - please checkout <a href="https://github.com/danielbohannon/Invoke-Obfuscation" target="_blank">Invoke-Obfuscation</a> for this!');
            if (!found_1) {
                var token_code = document.createElement("code");
                token_code.innerText = token_1.length > 20 ? (token_1.slice(0, 20) + "…") : token_1;
                token_code.title = token_1;
                logUserError("pattern-unknown", "It looks like this project is not aware of obfuscation options for ".concat(token_code.outerHTML, ". Create your own using the options panel below."));
            }
        }
        Tokens.slice(1).forEach(function (x, i) {
            var TokenText = x.GetStringContent();
            var _TokenText = TokenText.replace(/(['"])(.*?)\1/g, '$2');
            if (_this.ValueChars.some(function (y) { return Tokens[i].GetContent().reverse()[0] == y; }) || !Modifier.CommonOptionChars.some(function (x) { return _TokenText.startsWith(x); })) {
                x.SetType('value');
                if (Tokens[0].GetStringContent().match(/wmic(\.exe)?/i)
                    && !Tokens.slice(1, 2 + i).some(function (x) { return x.GetType() == 'disabled'; })
                    && !(Tokens[i].GetType() == 'argument' && Modifier.ValueChars.some(function (x) { return Tokens[i].GetContent().reverse()[0] == x; }))) {
                    console.log(Tokens[i]);
                    x.SetType('disabled');
                }
            }
            if (_TokenText.match(/^(?:\\\\[^\\]+|[a-zA-Z]:|\.[\\/])((?:\\[^\\]+)+\\)?([^<>:]*)$/) || _TokenText.match(/^[^<>:]+\.[a-zA-Z0-9]{2,4}$/))
                x.SetType('path');
            if (_TokenText.match(/^(HKLM|HKCC|HKCR|HKCU|HKU|HKEY_(LOCAL_MACHINE|CURRENT_CONFIG|CLASSES_ROOT|CURRENT_USER|USERS))\\?/i))
                x.SetType('disabled');
            if (_TokenText.startsWith('http:') || _TokenText.startsWith('https:') || _TokenText.match(/[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d/))
                x.SetType('url');
        });
        return Tokens;
    };
    Modifier.ParseProbability = function (Probability) {
        var ReturnProbability;
        if (Probability == null)
            ReturnProbability = 0.1;
        ReturnProbability = Number(Probability);
        if (ReturnProbability < 0 || ReturnProbability > 1)
            throw Error("Unexpected Probability (expecting 0<=x<=1, found x=".concat(ReturnProbability, ")"));
        return ReturnProbability;
    };
    Modifier.prototype.TestRun = function (InputCommand) {
        var token = new Token(Array.from(InputCommand));
        token.SetType("dummy");
        this.IncludedTypes = ["dummy"];
        this.InputCommandTokens = [token];
        this.Probability = 0.05;
        while (true) {
            this.Probability *= 2;
            this.GenerateOutput();
            if (token.GetStringContent() != InputCommand)
                return token.GetStringContent();
            else if (this.Probability > 1) {
                return null;
            }
        }
    };
    Modifier.GetAllModifiers = function () {
        return Modifier.Implementations;
    };
    Modifier.SeparationChar = ' ';
    Modifier.QuoteChars = ['"', "'"];
    Modifier.ValueChars = ['=', ':'];
    Modifier.CommonOptionChars = ['/', '-'];
    Modifier.Implementations = {};
    Modifier.Register = function (Name, Description, DefaultIncludedTypes) {
        return function (target) {
            Modifier.Implementations[target.name] = new ModifierDefinition({ Name: Name, Description: Description, DefaultIncludedTypes: DefaultIncludedTypes, Function: target });
        };
    };
    Modifier.AddArgument = function (name, type, readableName, description) {
        return function (target) {
            if (!(target.name in Modifier.Implementations))
                throw Error("Unexpected argument declaration for modifier ".concat(target.name));
            var obj = Modifier.Implementations[target.name];
            if (obj.Function.toString().split('\n')[0].indexOf(name) <= -1) {
                throw Error("Unexpected argument declaration for non-existing property ".concat(name, " on modifier ").concat(target.name));
            }
            obj.Arguments.unshift(new ModifierArgumentsDefinition({ InternalName: name, Type: type, PublicName: readableName, Description: description }));
        };
    };
    return Modifier;
}());
var SedStatement = (function () {
    function SedStatement(Statement) {
        var results = Statement.match(SedStatement.FORMAT);
        this.Find = results[1].replace(/\\(\\|\/)/g, '$1');
        this.Replace = results[2].replace(/\\(\\|\/)/g, '$1').split('|');
        this.CaseInsensitive = (results[3] !== undefined && results[3].indexOf('i') >= 0) || false;
    }
    SedStatement.prototype.StringIndex = function (Content) {
        if (this.CaseInsensitive)
            return Content.toUpperCase().indexOf(this.Find.toUpperCase());
        else
            return Content.indexOf(this.Find);
    };
    SedStatement.FORMAT = new RegExp(/^s\/((?:[^\/\\]|\\(?:\\|\/))+?)\/((?:[^\/\\]|\\(?:\\|\/))*?)\/([ig])?$/);
    return SedStatement;
}());
var Token = (function () {
    function Token(TokenContent) {
        var _this = this;
        this.TokenContent = this.TokenContentOriginal = TokenContent;
        this.Type = "argument";
        this.TokenTypes = {};
        Array.from(document.querySelector('menu').children).forEach(function (x) { return _this.TokenTypes[x.dataset.type] = x.innerText; });
    }
    Token.prototype.SetElements = function (ConfigElement, OutputElement) {
        var _this = this;
        var _a, _b;
        this.ConfigElement = ConfigElement;
        this.OutputElement = OutputElement;
        (_a = this.ConfigElement) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) { return _this.HandleClick(e); });
        this.ContextMenu = document.getElementsByClassName("context-menu")[0].cloneNode(true);
        this.ContextMenu.childNodes.forEach(function (x) { x.addEventListener("click", function (e) { return _this.HandleContextClick(e); }); });
        this.SetContent(this.TokenContent, false);
        this.SetType(this.Type);
        (_b = this.ConfigElement) === null || _b === void 0 ? void 0 : _b.parentElement.appendChild(this.ContextMenu);
    };
    Token.prototype.GetContent = function () {
        return this.TokenContent.slice();
    };
    Token.prototype.GetStringContent = function () {
        return this.TokenContent.join("");
    };
    Token.prototype.SetContent = function (Content, OutputOnly) {
        if (OutputOnly === void 0) { OutputOnly = true; }
        this.TokenContent = Content;
        if (this.OutputElement)
            this.OutputElement.textContent = this.TokenContent.join('');
        if (!OutputOnly && this.ConfigElement)
            this.ConfigElement.textContent = this.OutputElement.textContent;
    };
    Token.prototype.Reset = function () {
        this.SetContent(this.TokenContentOriginal);
    };
    Token.prototype.SetType = function (Type) {
        this.Type = Type;
        if (this.ConfigElement) {
            this.ConfigElement.dataset.type = Type;
            this.ConfigElement.title = "This token is currently marked as '".concat(this.TokenTypes[this.Type], "'.");
        }
        if (this.ContextMenu)
            Array.from(this.ContextMenu.children).forEach(function (x) { var element = x; element.dataset.active = element.dataset.type == Type ? 'true' : ''; });
    };
    Token.prototype.GetType = function () {
        return this.Type;
    };
    Token.prototype.HandleContextClick = function (evt) {
        var Element = evt.currentTarget;
        this.SetType(Element.dataset.type);
        this.ConfigElement.dispatchEvent(new Event("click"));
    };
    Token.prototype.HandleClick = function (evt) {
        var _this = this;
        if (this.ContextMenu.style.display != "block") {
            this.ContextMenu.style.display = "block";
            SetPosition(evt.currentTarget, this.ContextMenu);
            this.ClickHandler = function (evt) {
                if (!_this.ContextMenu.contains(evt.target) && !_this.ConfigElement.contains(evt.target)) {
                    _this.ConfigElement.dispatchEvent(new Event("click"));
                }
            };
            window.addEventListener('mousedown', this.ClickHandler);
        }
        else {
            this.ContextMenu.style.display = "none";
            if (this.ClickHandler)
                window.removeEventListener('mousedown', this.ClickHandler);
        }
    };
    return Token;
}());
var CharacterInsertion = (function (_super) {
    __extends(CharacterInsertion, _super);
    function CharacterInsertion(InputCommand, ApplyTo, Probability, Characters, Offset) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        if (Characters == null || Characters.length == 0)
            throw Error("Invalid value passed for 'Characters'");
        if (Offset < 0)
            throw Error("Cannot use an offset of smaller than 0");
        _this.Offset = Offset || 0;
        _this.CharacterInsertRange = Characters.split('').map(function (x) { return x; });
        return _this;
    }
    CharacterInsertion.prototype.GenerateOutput = function () {
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = Token.GetContent().slice(0, This.Offset);
            var lastChar = Modifier.CommonOptionChars.some(function (y) { return Token.GetContent()[0] == y; }) && Modifier.ValueChars.some(function (y) { return Token.GetContent().reverse()[0] == y; }) ? Token.GetContent().length - 1 : undefined;
            Token.GetContent().slice(This.Offset, lastChar).forEach(function (char) {
                NewTokenContent.push(char);
                var i = 0;
                if (This.IncludedTypes.includes(Token.GetType()) && Modifier.CoinFlip(This.Probability))
                    do {
                        NewTokenContent.push(Modifier.ChooseRandom(This.CharacterInsertRange));
                        i++;
                    } while (Modifier.CoinFlip(This.Probability * (Math.pow(0.9, i))));
            });
            if (lastChar !== undefined)
                NewTokenContent.push.apply(NewTokenContent, Token.GetContent().slice(lastChar));
            Token.SetContent(NewTokenContent);
        });
    };
    CharacterInsertion = __decorate([
        Modifier.AddArgument("Characters", "text-a", "Accepted Characters", "Paste all characters, without separators, here"),
        Modifier.AddArgument("Offset", "number", "Offset", "The positions up to this index (zero-based, exclusive) will not be used for character insertion. Default: 0"),
        Modifier.Register("Character Insertion", "Add arbitrary characters to command-line arguments.", ['argument'])
    ], CharacterInsertion);
    return CharacterInsertion;
}(Modifier));
var FilePathTransformer = (function (_super) {
    __extends(FilePathTransformer, _super);
    function FilePathTransformer(InputCommand, ApplyTo, Probability, PathTraversal, SubstituteSlashes, ExtraSlashes) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        _this.Keywords = ["debug", "system32", "compile", "winsxs", "temp", "update"];
        _this.PathTraversal = PathTraversal;
        _this.SubstituteSlashes = SubstituteSlashes;
        _this.ExtraSlashes = ExtraSlashes;
        return _this;
    }
    FilePathTransformer.prototype.GenerateOutput = function () {
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = Token.GetStringContent();
            if (This.IncludedTypes.includes(Token.GetType())) {
                if (This.PathTraversal) {
                    NewTokenContent = NewTokenContent.replace(/([^\\/])([\\/])([^\\/])/g, function (match, a, b, c) {
                        var repeats = b;
                        var i = 0;
                        var options = This.Keywords.map(function (x) { return "".concat(x).concat(b, "..").concat(b); });
                        options.push(".".concat(b));
                        do {
                            repeats += Modifier.ChooseRandom(options);
                            i++;
                        } while (Modifier.CoinFlip(This.Probability * (Math.pow(0.9, i))));
                        return Modifier.CoinFlip(This.Probability) ? "".concat(a).concat(repeats).concat(c) : match;
                    });
                }
                if (This.SubstituteSlashes) {
                    NewTokenContent = NewTokenContent.replace(/(?<!:)(?:[/]+|[\\]+)/g, function (a, i) {
                        if (Modifier.CoinFlip(This.Probability) && i > 0)
                            return (a.startsWith("\\") ? "/" : "\\").repeat(a.length);
                        return a;
                    });
                }
                if (This.ExtraSlashes && Modifier.CoinFlip(This.Probability)) {
                    NewTokenContent = NewTokenContent.replace(/([^\\/])([\\/])([^\\/])/g, function (match, a, b, c) {
                        var repeats = b;
                        var i = 0;
                        do {
                            repeats += b;
                            i++;
                        } while (Modifier.CoinFlip(This.Probability * (Math.pow(0.9, i))));
                        return Modifier.CoinFlip(This.Probability) ? "".concat(a).concat(repeats).concat(c) : match;
                    });
                }
                Token.SetContent(NewTokenContent.split(""));
            }
        });
    };
    FilePathTransformer = __decorate([
        Modifier.AddArgument("PathTraversal", "checkbox", "Path traversal", ""),
        Modifier.AddArgument("SubstituteSlashes", "checkbox", "Transform slashes", ""),
        Modifier.AddArgument("ExtraSlashes", "checkbox", "Extra slashes", ""),
        Modifier.Register("File Path Transformer", "Change the format in which file paths are represented.", ['path'])
    ], FilePathTransformer);
    return FilePathTransformer;
}(Modifier));
var OptionCharSubstitution = (function (_super) {
    __extends(OptionCharSubstitution, _super);
    function OptionCharSubstitution(InputCommand, ApplyTo, Probability, OutputOptionChars) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        if (OutputOptionChars == null || OutputOptionChars.length == 0)
            throw Error("Unexpected OutputOptionChars length (expecting at least 1, found ".concat(OutputOptionChars === null || OutputOptionChars === void 0 ? void 0 : OutputOptionChars.length, ")"));
        _this.OutputOptionChars = OutputOptionChars.split('').map(function (x) { return x; });
        return _this;
    }
    OptionCharSubstitution.prototype.GenerateOutput = function () {
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = Token.GetContent();
            if (This.IncludedTypes.includes(Token.GetType()) && This.OutputOptionChars.some(function (x) { return x == NewTokenContent[0]; }) && (NewTokenContent.length == 1 || !This.OutputOptionChars.some(function (x) { return x == NewTokenContent[1]; })) && Modifier.CoinFlip(This.Probability)) {
                NewTokenContent[0] = Modifier.ChooseRandom(This.OutputOptionChars.filter(function (x) { return x !== NewTokenContent[0]; }));
                Token.SetContent(NewTokenContent);
            }
        });
    };
    OptionCharSubstitution = __decorate([
        Modifier.AddArgument("OutputOptionChars", "text-a", "Possible option chars", "All possible option chars here, without separator"),
        Modifier.Register("Option Char Substitution", "Replace option characters, such as '/' or '-' with acceptable alternatives.", ['argument'])
    ], OptionCharSubstitution);
    return OptionCharSubstitution;
}(Modifier));
var QuoteInsertion = (function (_super) {
    __extends(QuoteInsertion, _super);
    function QuoteInsertion(InputCommand, ApplyTo, Probability) {
        return _super.call(this, InputCommand, ApplyTo, Probability) || this;
    }
    QuoteInsertion_1 = QuoteInsertion;
    QuoteInsertion.prototype.AddQuotes = function (input) {
        var This = this;
        var result = [];
        input.forEach(function (char, index) {
            var nextChar = index + 1 < input.length ? input[index + 1] : "";
            result.push(char);
            if (QuoteInsertion_1.AcceptableSuccessionChars.test(char.toString()) && (nextChar == "" || QuoteInsertion_1.AcceptableSuccessionChars.test(nextChar.toString())) && Modifier.CoinFlip(This.Probability)) {
                result.push(QuoteInsertion_1.QuoteCharacter);
            }
        });
        if (result.filter(function (x) { return x == QuoteInsertion_1.QuoteCharacter; }).length % 2 != input.filter(function (x) { return x == QuoteInsertion_1.QuoteCharacter; }).length % 2)
            result.splice(result.lastIndexOf(QuoteInsertion_1.QuoteCharacter), 1);
        return result;
    };
    QuoteInsertion.prototype.GenerateOutput = function () {
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            if (!This.IncludedTypes.includes(Token.GetType()))
                return;
            var parts = Token.GetStringContent().split(Modifier.SeparationChar.toString());
            var NewTokenContent = Array.from(parts.map(function (part) { return This.AddQuotes(Array.from(part)).join(''); }).join(Modifier.SeparationChar.toString()));
            Token.SetContent(NewTokenContent);
            return;
        });
    };
    var QuoteInsertion_1;
    QuoteInsertion.QuoteCharacter = new String("\"");
    QuoteInsertion.AcceptableSuccessionChars = /^[a-z0-9\-\/]$/i;
    QuoteInsertion = QuoteInsertion_1 = __decorate([
        Modifier.Register("Quote Insertion", "Add pairs of quotes to command-line arguments.", ['argument', 'path', 'url', 'value'])
    ], QuoteInsertion);
    return QuoteInsertion;
}(Modifier));
var RandomCase = (function (_super) {
    __extends(RandomCase, _super);
    function RandomCase(InputCommand, ApplyTo, Probability) {
        return _super.call(this, InputCommand, ApplyTo, Probability) || this;
    }
    RandomCase.prototype.GenerateOutput = function () {
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = [];
            Token.GetContent().forEach(function (char) {
                if (This.IncludedTypes.includes(Token.GetType())) {
                    if (Modifier.CoinFlip(This.Probability) === true) {
                        var x = CharEquals(new String(char.toLowerCase()), char);
                        NewTokenContent.push((x ? char.toUpperCase() : char.toLowerCase()));
                    }
                    else {
                        NewTokenContent.push(char);
                    }
                    Token.SetContent(NewTokenContent);
                }
            });
        });
    };
    RandomCase = __decorate([
        Modifier.Register("RaNdOmCaSe", "Flip UPPERCASE characters to their lowercase equivalent, and vice versa.", ['command', 'argument', 'value', 'path'])
    ], RandomCase);
    return RandomCase;
}(Modifier));
var Regex = (function (_super) {
    __extends(Regex, _super);
    function Regex(InputCommand, ApplyTo, Probability, RegexMatch, RegexReplace, CaseSensitive) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        if (!RegexMatch)
            throw Error("No regex string provided");
        try {
            _this.RegexMatch = new RegExp(RegexMatch, CaseSensitive ? "" : "i");
        }
        catch (_a) {
            throw Error("Regex could not be compiled.");
        }
        _this.RegexReplace = RegexReplace;
        return _this;
    }
    Regex.prototype.GenerateOutput = function () {
        var _this = this;
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = Token.GetStringContent();
            if (This.IncludedTypes.includes(Token.GetType()) && Modifier.CoinFlip(_this.Probability) && NewTokenContent.match(_this.RegexMatch)) {
                var RexReplace = _this.RegexReplace.replace(new RegExp('\\$(\\d+)\\[(\\d+):(\\d+(?:-(?:\\d+)?)?)\\]'), function (x, rIndex, start, end) {
                    var match = NewTokenContent.match(_this.RegexMatch)[rIndex];
                    if (end.indexOf('-') >= 0) {
                        var ids_1 = end.split('-');
                        if (!ids_1[1])
                            ids_1[1] = match.length;
                        var choices = Array.from(new Array(parseInt(ids_1[1])), function (x, i) { return i + parseInt(ids_1[0]); });
                        end = Modifier.ChooseRandom(choices);
                    }
                    return match.substring(start, end);
                });
                RexReplace = RexReplace.replace(/\$RANDOM/g, Modifier.RandomString(Modifier.ChooseRandom(Array.from(Array(20).keys())) + 1));
                NewTokenContent = NewTokenContent.replace(_this.RegexMatch, RexReplace);
            }
            Token.SetContent(NewTokenContent.split(""));
        });
    };
    Regex = __decorate([
        Modifier.AddArgument("RegexMatch", "text-s", "Regex Match", "The regex string to find"),
        Modifier.AddArgument("RegexReplace", "text-s", "Regex Replace", "The replacement string"),
        Modifier.AddArgument("CaseSensitive", "checkbox", "Case sensitive", ""),
        Modifier.Register("Regex", "Apply a regex-replace operation (on token-level).", ['argument', 'value', 'path', 'url'])
    ], Regex);
    return Regex;
}(Modifier));
var Sed = (function (_super) {
    __extends(Sed, _super);
    function Sed(InputCommand, ApplyTo, Probability, SedStatements) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        _this.SedStatements = [];
        if (!SedStatements)
            throw Error("No sed statements string provided");
        SedStatements.split('\n').forEach(function (x) {
            try {
                if (x)
                    _this.SedStatements.push(new SedStatement(x));
            }
            catch (_a) {
                var token_code = document.createElement("code");
                token_code.innerText = x;
                logUserError("sed-compile-error", "Could not compile sed statement ".concat(token_code.outerHTML, "."), true);
            }
        });
        return _this;
    }
    Sed.prototype.GenerateOutput = function () {
        var _this = this;
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = Token.GetStringContent();
            if (This.IncludedTypes.includes(Token.GetType())) {
                var matches = _this.SedStatements.filter(function (x) { return x.StringIndex(NewTokenContent) >= 0; });
                matches.forEach(function (match) {
                    var instance = match.StringIndex(NewTokenContent);
                    while (instance >= 0) {
                        var replacement = Modifier.ChooseRandom(match.Replace);
                        if (Modifier.CoinFlip(_this.Probability)) {
                            NewTokenContent = NewTokenContent.substring(0, instance) + replacement + NewTokenContent.substring(instance + match.Find.length);
                        }
                        instance = NewTokenContent.indexOf(match.Find, instance + replacement.length + 1);
                    }
                });
                Token.SetContent(NewTokenContent.split(""));
            }
        });
    };
    Sed = __decorate([
        Modifier.AddArgument("SedStatements", "textarea", "Sed statements", "Sed replacement statements, one per line, e.g.:\ns/xx/yy/ to replace xx with yy\ns/xx/yy/i to replace xx with yy, case insensitively\ns/xx/yy|zz/ to replace xx with either yy or zz (at random)"),
        Modifier.Register("Sed replacements", "Apply a sed-style replace operation (on token-level).", ['argument', 'value'])
    ], Sed);
    return Sed;
}(Modifier));
var Shorthands = (function (_super) {
    __extends(Shorthands, _super);
    function Shorthands(InputCommand, ApplyTo, Probability, ShorthandCommands, CaseSensitive) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        _this.Substitutions = new Map();
        try {
            var This_1 = _this;
            var commands_1 = new Set(ShorthandCommands.split(Shorthands_1.Separator).map(function (x) { return Shorthands_1.NormaliseArgument(x, CaseSensitive); }));
            _this.CaseSensitive = CaseSensitive;
            commands_1.forEach(function (command) {
                var suffix = Modifier.ValueChars.includes(command.charAt(command.length - 1)) ? command.charAt(command.length - 1) : "";
                if (command.length <= 1)
                    return;
                var commands_other_s = new Set(commands_1);
                commands_other_s.delete(command);
                var commands_other_a = Array.from(commands_other_s);
                var _loop_4 = function () {
                    var command_shortened = command.substring(0, i);
                    if (commands_other_a.every(function (command_test) { return command_test.substring(0, i) !== command_shortened; })) {
                        var options_1 = Array.from({ length: command.length - i }, function (_, j) { return command.substring(0, i + j) + suffix; });
                        This_1.Substitutions.set(command, options_1);
                        options_1.forEach(function (option) { return This_1.Substitutions.set(option, options_1); });
                        return "break";
                    }
                };
                for (var i = 1; i < command.length; i++) {
                    var state_1 = _loop_4();
                    if (state_1 === "break")
                        break;
                }
            });
        }
        catch (e) {
            logUserError("shorthand-error", "Could not compute shorthand permutations.", true);
            throw e;
        }
        return _this;
    }
    Shorthands_1 = Shorthands;
    Shorthands.NormaliseArgument = function (input, CaseSensitive, strip_option_char) {
        if (strip_option_char === void 0) { strip_option_char = true; }
        var result = input;
        if (strip_option_char && Modifier.CommonOptionChars.some(function (x) { return input.startsWith(x.toString()); }))
            result = input.substring(1);
        if (!CaseSensitive)
            result = result.toLocaleLowerCase();
        return result;
    };
    Shorthands.prototype.GenerateOutput = function () {
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            if (This.IncludedTypes.includes(Token.GetType()) && Modifier.CoinFlip(This.Probability)) {
                var token = Shorthands_1.NormaliseArgument(Token.GetStringContent(), This.CaseSensitive);
                if (This.Substitutions.has(token)) {
                    var original_token = Shorthands_1.NormaliseArgument(Token.GetStringContent(), This.CaseSensitive, false);
                    Token.SetContent(original_token.replace(token, Modifier.ChooseRandom(This.Substitutions.get(token))).split(""));
                }
            }
        });
    };
    var Shorthands_1;
    Shorthands.Separator = ",";
    Shorthands = Shorthands_1 = __decorate([
        Modifier.AddArgument("ShorthandCommands", "textarea", "Commands that can be shortened", "Enter ALL commands that can be shortened here (comma separated).\ne.g. enter 'test' if 'tes', 'te', 't' are also accepted.\nShould there be commands that start with the same letters, this will be taken into account when generating alternatives."),
        Modifier.AddArgument("CaseSensitive", "checkbox", "Case sensitive", ""),
        Modifier.Register("Shorthands", "Allow certain commands to be shortened.", ['argument'])
    ], Shorthands);
    return Shorthands;
}(Modifier));
var UrlTransformer = (function (_super) {
    __extends(UrlTransformer, _super);
    function UrlTransformer(InputCommand, ApplyTo, Probability, LeaveOutProtocol, LeaveOutDoubleSlashes, SubstituteSlashes, IpToHex, PathTraversal) {
        var _this = _super.call(this, InputCommand, ApplyTo, Probability) || this;
        _this.Keywords = ["debug", "system32", "compile", "winsxs", "temp", "update"];
        _this.Probability = Modifier.ParseProbability(Probability);
        _this.LeaveOutProtocol = LeaveOutProtocol;
        _this.LeaveOutDoubleSlashes = LeaveOutDoubleSlashes;
        _this.SubstituteSlashes = SubstituteSlashes;
        _this.IpToHex = IpToHex;
        _this.PathTraversal = PathTraversal;
        return _this;
    }
    UrlTransformer.prototype.GenerateOutput = function () {
        var _this = this;
        var This = this;
        this.InputCommandTokens.forEach(function (Token) {
            var NewTokenContent = Token.GetStringContent();
            if (This.IncludedTypes.includes(Token.GetType())) {
                if (_this.LeaveOutProtocol && Modifier.CoinFlip(_this.Probability))
                    NewTokenContent = NewTokenContent.replace(/\w+:\/\//, "://");
                if (This.PathTraversal) {
                    NewTokenContent = NewTokenContent.replace(/([^/])([/])([^/])/g, function (match, a, b, c) {
                        var repeats = b;
                        var i = 0;
                        var options = This.Keywords.map(function (x) { return "".concat(x).concat(b, "..").concat(b); });
                        do {
                            repeats += Modifier.ChooseRandom(options);
                            i++;
                        } while (Modifier.CoinFlip(This.Probability * (Math.pow(0.9, i))));
                        return Modifier.CoinFlip(This.Probability) ? "".concat(a).concat(repeats).concat(c) : match;
                    });
                }
                if (_this.LeaveOutDoubleSlashes && Modifier.CoinFlip(_this.Probability))
                    NewTokenContent = NewTokenContent.replace(/\:\/\//, ":/");
                if (_this.SubstituteSlashes) {
                    var match = void 0;
                    var regex = /\/+/g;
                    while ((match = regex.exec(NewTokenContent)) !== null) {
                        if (Modifier.CoinFlip(_this.Probability))
                            NewTokenContent = NewTokenContent.substring(0, match.index) + ('\\'.repeat(match[0].length)) + NewTokenContent.substring(match.index + match[0].length, NewTokenContent.length);
                    }
                }
                if (_this.IpToHex && Modifier.CoinFlip(_this.Probability)) {
                    var IpAddress = NewTokenContent.match('(?:[0-9]{1,3}\.){3}[0-9]{1,3}');
                    if (IpAddress != null && IpAddress.length > 0) {
                        var Decimals = IpAddress[0].split('.').map(function (Decimal) { return Number.parseInt(Decimal); });
                        var Decimal = Decimals[3] + Decimals[2] * 256 + Decimals[1] * (Math.pow(256, 2)) + Decimals[0] * (Math.pow(256, 3));
                        if (Modifier.CoinFlip(0.5))
                            NewTokenContent = NewTokenContent.replace(IpAddress[0], Decimal.toString(10));
                        else
                            NewTokenContent = NewTokenContent.replace(IpAddress[0], "0x" + Decimal.toString(16));
                    }
                }
                Token.SetContent(NewTokenContent.split(""));
            }
        });
    };
    UrlTransformer = __decorate([
        Modifier.AddArgument("LeaveOutProtocol", "checkbox", "Omit Protocol", ""),
        Modifier.AddArgument("LeaveOutDoubleSlashes", "checkbox", "Alternative Double Slashes (:// vs :/)", ""),
        Modifier.AddArgument("SubstituteSlashes", "checkbox", "Transform Slashes", ""),
        Modifier.AddArgument("IpToHex", "checkbox", "Alternate IP Form", ""),
        Modifier.AddArgument("PathTraversal", "checkbox", "URL Path traversal", ""),
        Modifier.Register("URL Transformer", "Change the format in which URLs are represented.", ['url'])
    ], UrlTransformer);
    return UrlTransformer;
}(Modifier));
//# sourceMappingURL=main.js.map