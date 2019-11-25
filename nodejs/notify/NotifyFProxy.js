/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */

"use strict";

var assert    = require("assert");
var TarsStream = require("@tars/stream");
var TarsError  = require("@tars/rpc").error;

var tars = tars || {};
module.exports.tars = tars;

tars.NotifyProxy = function () {
    this._name   = undefined;
    this._worker = undefined;
};

tars.NotifyProxy.prototype.setTimeout = function (iTimeout) {
    this._worker.timeout = iTimeout;
};

tars.NotifyProxy.prototype.getTimeout = function () {
    return this._worker.timeout;
};


tars.NOTIFYLEVEL = {
    "NOTIFYNORMAL" : 0,
    "NOTIFYWARN" : 1,
    "NOTIFYERROR" : 2,
    "_classname" : "tars.NOTIFYLEVEL"
};
tars.NOTIFYLEVEL._write = function(os, tag, val) { return os.writeInt32(tag, val); };
tars.NOTIFYLEVEL._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };
tars.ReportType = {
    "REPORT" : 0,
    "NOTIFY" : 1,
    "_classname" : "tars.ReportType"
};
tars.ReportType._write = function(os, tag, val) { return os.writeInt32(tag, val); };
tars.ReportType._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

tars.NotifyKey = function() {
    this.name = "";
    this.ip = "";
    this.page = 0;
    this._classname = "tars.NotifyKey";
};
tars.NotifyKey._classname = "tars.NotifyKey";
tars.NotifyKey._write = function (os, tag, value) { os.writeStruct(tag, value); };
tars.NotifyKey._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
tars.NotifyKey._readFrom = function (is) {
    var tmp = new tars.NotifyKey();
    tmp.name = is.readString(1, true, "");
    tmp.ip = is.readString(2, true, "");
    tmp.page = is.readInt32(3, true, 0);
    return tmp;
};
tars.NotifyKey.prototype._writeTo = function (os) {
    os.writeString(1, this.name);
    os.writeString(2, this.ip);
    os.writeInt32(3, this.page);
};
tars.NotifyKey.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
tars.NotifyKey.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
tars.NotifyKey.prototype.toObject = function() { 
    return {
        "name" : this.name,
        "ip" : this.ip,
        "page" : this.page
    };
};
tars.NotifyKey.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("name") && (this.name = json.name);
    json.hasOwnProperty("ip") && (this.ip = json.ip);
    json.hasOwnProperty("page") && (this.page = json.page);
};
tars.NotifyKey.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
tars.NotifyKey.new = function () {
    return new tars.NotifyKey();
};
tars.NotifyKey.create = function (is) {
    return tars.NotifyKey._readFrom(is);
};

tars.NotifyItem = function() {
    this.sTimeStamp = "";
    this.sServerId = "";
    this.iLevel = 0;
    this.sMessage = "";
    this._classname = "tars.NotifyItem";
};
tars.NotifyItem._classname = "tars.NotifyItem";
tars.NotifyItem._write = function (os, tag, value) { os.writeStruct(tag, value); };
tars.NotifyItem._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
tars.NotifyItem._readFrom = function (is) {
    var tmp = new tars.NotifyItem();
    tmp.sTimeStamp = is.readString(1, true, "");
    tmp.sServerId = is.readString(2, true, "");
    tmp.iLevel = is.readInt32(3, true, 0);
    tmp.sMessage = is.readString(4, true, "");
    return tmp;
};
tars.NotifyItem.prototype._writeTo = function (os) {
    os.writeString(1, this.sTimeStamp);
    os.writeString(2, this.sServerId);
    os.writeInt32(3, this.iLevel);
    os.writeString(4, this.sMessage);
};
tars.NotifyItem.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
tars.NotifyItem.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
tars.NotifyItem.prototype.toObject = function() { 
    return {
        "sTimeStamp" : this.sTimeStamp,
        "sServerId" : this.sServerId,
        "iLevel" : this.iLevel,
        "sMessage" : this.sMessage
    };
};
tars.NotifyItem.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("sTimeStamp") && (this.sTimeStamp = json.sTimeStamp);
    json.hasOwnProperty("sServerId") && (this.sServerId = json.sServerId);
    json.hasOwnProperty("iLevel") && (this.iLevel = json.iLevel);
    json.hasOwnProperty("sMessage") && (this.sMessage = json.sMessage);
};
tars.NotifyItem.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
tars.NotifyItem.new = function () {
    return new tars.NotifyItem();
};
tars.NotifyItem.create = function (is) {
    return tars.NotifyItem._readFrom(is);
};

tars.NotifyInfo = function() {
    this.nextpage = 0;
    this.notifyItems = new TarsStream.List(tars.NotifyItem);
    this._classname = "tars.NotifyInfo";
};
tars.NotifyInfo._classname = "tars.NotifyInfo";
tars.NotifyInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
tars.NotifyInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
tars.NotifyInfo._readFrom = function (is) {
    var tmp = new tars.NotifyInfo();
    tmp.nextpage = is.readInt32(1, true, 0);
    tmp.notifyItems = is.readList(2, true, TarsStream.List(tars.NotifyItem));
    return tmp;
};
tars.NotifyInfo.prototype._writeTo = function (os) {
    os.writeInt32(1, this.nextpage);
    os.writeList(2, this.notifyItems);
};
tars.NotifyInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
tars.NotifyInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
tars.NotifyInfo.prototype.toObject = function() { 
    return {
        "nextpage" : this.nextpage,
        "notifyItems" : this.notifyItems.toObject()
    };
};
tars.NotifyInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("nextpage") && (this.nextpage = json.nextpage);
    json.hasOwnProperty("notifyItems") && (this.notifyItems.readFromObject(json.notifyItems));
};
tars.NotifyInfo.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
tars.NotifyInfo.new = function () {
    return new tars.NotifyInfo();
};
tars.NotifyInfo.create = function (is) {
    return tars.NotifyInfo._readFrom(is);
};

tars.ReportInfo = function() {
    this.eType = tars.ReportType.REPORT;
    this.sApp = "";
    this.sSet = "";
    this.sContainer = "";
    this.sServer = "";
    this.sMessage = "";
    this.sThreadId = "";
    this.eLevel = tars.NOTIFYLEVEL.NOTIFYNORMAL;
    this._classname = "tars.ReportInfo";
};
tars.ReportInfo._classname = "tars.ReportInfo";
tars.ReportInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
tars.ReportInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
tars.ReportInfo._readFrom = function (is) {
    var tmp = new tars.ReportInfo();
    tmp.eType = is.readInt32(1, true, tars.ReportType.REPORT);
    tmp.sApp = is.readString(2, true, "");
    tmp.sSet = is.readString(3, true, "");
    tmp.sContainer = is.readString(4, true, "");
    tmp.sServer = is.readString(5, true, "");
    tmp.sMessage = is.readString(6, true, "");
    tmp.sThreadId = is.readString(7, false, "");
    tmp.eLevel = is.readInt32(8, false, tars.NOTIFYLEVEL.NOTIFYNORMAL);
    return tmp;
};
tars.ReportInfo.prototype._writeTo = function (os) {
    os.writeInt32(1, this.eType);
    os.writeString(2, this.sApp);
    os.writeString(3, this.sSet);
    os.writeString(4, this.sContainer);
    os.writeString(5, this.sServer);
    os.writeString(6, this.sMessage);
    os.writeString(7, this.sThreadId);
    os.writeInt32(8, this.eLevel);
};
tars.ReportInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
tars.ReportInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
tars.ReportInfo.prototype.toObject = function() { 
    return {
        "eType" : this.eType,
        "sApp" : this.sApp,
        "sSet" : this.sSet,
        "sContainer" : this.sContainer,
        "sServer" : this.sServer,
        "sMessage" : this.sMessage,
        "sThreadId" : this.sThreadId,
        "eLevel" : this.eLevel
    };
};
tars.ReportInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("eType") && (this.eType = json.eType);
    json.hasOwnProperty("sApp") && (this.sApp = json.sApp);
    json.hasOwnProperty("sSet") && (this.sSet = json.sSet);
    json.hasOwnProperty("sContainer") && (this.sContainer = json.sContainer);
    json.hasOwnProperty("sServer") && (this.sServer = json.sServer);
    json.hasOwnProperty("sMessage") && (this.sMessage = json.sMessage);
    json.hasOwnProperty("sThreadId") && (this.sThreadId = json.sThreadId);
    json.hasOwnProperty("eLevel") && (this.eLevel = json.eLevel);
};
tars.ReportInfo.prototype.toBinBuffer = function () {
    var os = new TarsStream.TarsOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
tars.ReportInfo.new = function () {
    return new tars.ReportInfo();
};
tars.ReportInfo.create = function (is) {
    return tars.ReportInfo._readFrom(is);
};


var __tars_Notify$getNotifyInfo$EN = function (stKey) {
    var os = new TarsStream.TarsOutputStream();
    os.writeStruct(1, stKey);
    return os.getBinBuffer();
};

var __tars_Notify$getNotifyInfo$DE = function (data) {
    try {
        var is = new TarsStream.TarsInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "stInfo" : is.readStruct(2, true, tars.NotifyInfo)
                }
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_Notify$getNotifyInfo$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.NotifyProxy.prototype.getNotifyInfo = function (stKey) {
    return this._worker.tars_invoke("getNotifyInfo", __tars_Notify$getNotifyInfo$EN(stKey), arguments[arguments.length - 1]).then(__tars_Notify$getNotifyInfo$DE, __tars_Notify$getNotifyInfo$ER);
};

var __tars_Notify$notifyServer$EN = function (sServerName, level, sMessage) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, sServerName);
    os.writeInt32(2, level);
    os.writeString(3, sMessage);
    return os.getBinBuffer();
};

var __tars_Notify$notifyServer$DE = function (data) {
    try {
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_Notify$notifyServer$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.NotifyProxy.prototype.notifyServer = function (sServerName, level, sMessage) {
    return this._worker.tars_invoke("notifyServer", __tars_Notify$notifyServer$EN(sServerName, level, sMessage), arguments[arguments.length - 1]).then(__tars_Notify$notifyServer$DE, __tars_Notify$notifyServer$ER);
};

var __tars_Notify$reportNotifyInfo$EN = function (info) {
    var os = new TarsStream.TarsOutputStream();
    os.writeStruct(1, info);
    return os.getBinBuffer();
};

var __tars_Notify$reportNotifyInfo$DE = function (data) {
    try {
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_Notify$reportNotifyInfo$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.NotifyProxy.prototype.reportNotifyInfo = function (info) {
    return this._worker.tars_invoke("reportNotifyInfo", __tars_Notify$reportNotifyInfo$EN(info), arguments[arguments.length - 1]).then(__tars_Notify$reportNotifyInfo$DE, __tars_Notify$reportNotifyInfo$ER);
};

var __tars_Notify$reportServer$EN = function (sServerName, sThreadId, sMessage) {
    var os = new TarsStream.TarsOutputStream();
    os.writeString(1, sServerName);
    os.writeString(2, sThreadId);
    os.writeString(3, sMessage);
    return os.getBinBuffer();
};

var __tars_Notify$reportServer$DE = function (data) {
    try {
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime
            }
        };
    } catch (e) {
        throw {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "error" : {
                    "code" : TarsError.CLIENT.DECODE_ERROR,
                    "message" : e.message
                }
            }
        };
    }
};

var __tars_Notify$reportServer$ER = function (data) {
    throw {
        "request" : data.request,
        "response" : {
            "costtime" : data.request.costtime,
            "error" : data.error
        }
    }
};

tars.NotifyProxy.prototype.reportServer = function (sServerName, sThreadId, sMessage) {
    return this._worker.tars_invoke("reportServer", __tars_Notify$reportServer$EN(sServerName, sThreadId, sMessage), arguments[arguments.length - 1]).then(__tars_Notify$reportServer$DE, __tars_Notify$reportServer$ER);
};



