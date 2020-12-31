/**
 * Ecart
 * 
 * This file is part of Ecart.
 * 
 * Ecart is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * Ecart is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * Ecart. If not, see <http://www.gnu.org/licenses/>.
 * 
 * @copyright Copyright 2008-2009 E-Cart LLC
 * @license GNU Public License V3.0
 */

var Locale = {
    module : function(code, obj) {
        if (this[code] == undefined) {
            this[code] = {};
        }
        $.extend(this[code], obj);
    }
};

/**
 * First element of arguments is always points at module to use
 * 
 * @param {String}
 *            module_code
 */
String.prototype.l = function(module_code) {
    key = this;
    var module = 'core';

    if (module_code != undefined) {
        module = module_code;
    }
    // alert(module);
    if (!Locale[module]) {
        localized = '__module not found__';// key;
    } else {
        if (screencodes && screencodes == "1" && Locale[module][key + '_SCCODE']) {
            localized = Locale[module][key + '_SCCODE'];
        } else
            localized = Locale[module][key];
    }

    if (localized == undefined) {
        /*
         * $.each(Locale, function(k, v){ if (localized == undefined) {
         * localized = v[key]; } });
         */
        if (localized == undefined) {
            localized = '__translation not found__';// key;
        }
    }

    if (arguments.length > 1) {
        limit = arguments.length
        for (var i = 0; i < limit; i++) {
            localized = localized.replace('{' + i + '}', arguments[i + 1]);
        }
        //for ( var i = 1, limit = arguments.length - 1; i <= limit; i++) {
        //    /*
        //     * if (typeof arguments[i] != 'string') { continue; }
        //     */
        //    localized = localized.replace(new RegExp("{.+}"), arguments[i]);
        //}
    }

    return localized;
}