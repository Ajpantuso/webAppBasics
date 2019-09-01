/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "dd9011267a4fee20e6ea";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@material/base/component.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/base/component.js ***!
  \**************************************************/
/*! exports provided: MDCComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCComponent", function() { return MDCComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/base/foundation.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


var MDCComponent = /** @class */ (function () {
    function MDCComponent(root, foundation) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.root_ = root;
        this.initialize.apply(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](args));
        // Note that we initialize foundation here and not within the constructor's default param so that
        // this.root_ is defined and can be used within the foundation class.
        this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
        this.foundation_.init();
        this.initialSyncWithDOM();
    }
    MDCComponent.attachTo = function (root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new _foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]({}));
    };
    /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
    MDCComponent.prototype.initialize = function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
        // Subclasses can override this to do any additional setup work that would be considered part of a
        // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
        // initialized. Any additional arguments besides root and foundation will be passed in here.
    };
    MDCComponent.prototype.getDefaultFoundation = function () {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
            'foundation class');
    };
    MDCComponent.prototype.initialSyncWithDOM = function () {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    };
    MDCComponent.prototype.destroy = function () {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
    };
    MDCComponent.prototype.listen = function (evtType, handler, options) {
        this.root_.addEventListener(evtType, handler, options);
    };
    MDCComponent.prototype.unlisten = function (evtType, handler, options) {
        this.root_.removeEventListener(evtType, handler, options);
    };
    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
     */
    MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
        if (shouldBubble === void 0) { shouldBubble = false; }
        var evt;
        if (typeof CustomEvent === 'function') {
            evt = new CustomEvent(evtType, {
                bubbles: shouldBubble,
                detail: evtData,
            });
        }
        else {
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }
        this.root_.dispatchEvent(evt);
    };
    return MDCComponent;
}());

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCComponent);
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/@material/base/foundation.js":
/*!***************************************************!*\
  !*** ./node_modules/@material/base/foundation.js ***!
  \***************************************************/
/*! exports provided: MDCFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCFoundation", function() { return MDCFoundation; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = /** @class */ (function () {
    function MDCFoundation(adapter) {
        if (adapter === void 0) { adapter = {}; }
        this.adapter_ = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function () {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
        },
        enumerable: true,
        configurable: true
    });
    MDCFoundation.prototype.init = function () {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function () {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}());

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/dom/events.js":
/*!**********************************************!*\
  !*** ./node_modules/@material/dom/events.js ***!
  \**********************************************/
/*! exports provided: applyPassive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPassive", function() { return applyPassive; });
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * Stores result from applyPassive to avoid redundant processing to detect
 * passive event listener support.
 */
var supportsPassive_;
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive(globalObj, forceRefresh) {
    if (globalObj === void 0) { globalObj = window; }
    if (forceRefresh === void 0) { forceRefresh = false; }
    if (supportsPassive_ === undefined || forceRefresh) {
        var isSupported_1 = false;
        try {
            globalObj.document.addEventListener('test', function () { return undefined; }, {
                get passive() {
                    isSupported_1 = true;
                    return isSupported_1;
                },
            });
        }
        catch (e) {
        } // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.
        supportsPassive_ = isSupported_1;
    }
    return supportsPassive_ ? { passive: true } : false;
}
//# sourceMappingURL=events.js.map

/***/ }),

/***/ "./node_modules/@material/dom/ponyfill.js":
/*!************************************************!*\
  !*** ./node_modules/@material/dom/ponyfill.js ***!
  \************************************************/
/*! exports provided: closest, matches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return closest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    var el = element;
    while (el) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
function matches(element, selector) {
    var nativeMatches = element.matches
        || element.webkitMatchesSelector
        || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}
//# sourceMappingURL=ponyfill.js.map

/***/ }),

/***/ "./node_modules/@material/drawer/component.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/drawer/component.js ***!
  \****************************************************/
/*! exports provided: MDCDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCDrawer", function() { return MDCDrawer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _material_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/list/component */ "./node_modules/@material/list/component.js");
/* harmony import */ var _material_list_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material/list/foundation */ "./node_modules/@material/list/foundation.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! focus-trap */ "./node_modules/focus-trap/index.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(focus_trap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dismissible/foundation */ "./node_modules/@material/drawer/dismissible/foundation.js");
/* harmony import */ var _modal_foundation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal/foundation */ "./node_modules/@material/drawer/modal/foundation.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./util */ "./node_modules/@material/drawer/util.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */








var cssClasses = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCDismissibleDrawerFoundation"].cssClasses, strings = _dismissible_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCDismissibleDrawerFoundation"].strings;
/**
 * @events `MDCDrawer:closed {}` Emits when the navigation drawer has closed.
 * @events `MDCDrawer:opened {}` Emits when the navigation drawer has opened.
 */
var MDCDrawer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCDrawer, _super);
    function MDCDrawer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCDrawer.attachTo = function (root) {
        return new MDCDrawer(root);
    };
    Object.defineProperty(MDCDrawer.prototype, "open", {
        /**
         * @return boolean Proxies to the foundation's `open`/`close` methods.
         * Also returns true if drawer is in the open position.
         */
        get: function () {
            return this.foundation_.isOpen();
        },
        /**
         * Toggles the drawer open and closed.
         */
        set: function (isOpen) {
            if (isOpen) {
                this.foundation_.open();
            }
            else {
                this.foundation_.close();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCDrawer.prototype, "list", {
        get: function () {
            return this.list_;
        },
        enumerable: true,
        configurable: true
    });
    MDCDrawer.prototype.initialize = function (focusTrapFactory, listFactory) {
        if (focusTrapFactory === void 0) { focusTrapFactory = focus_trap__WEBPACK_IMPORTED_MODULE_4___default.a; }
        if (listFactory === void 0) { listFactory = function (el) { return new _material_list_component__WEBPACK_IMPORTED_MODULE_2__["MDCList"](el); }; }
        var listEl = this.root_.querySelector("." + _material_list_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCListFoundation"].cssClasses.ROOT);
        if (listEl) {
            this.list_ = listFactory(listEl);
            this.list_.wrapFocus = true;
        }
        this.focusTrapFactory_ = focusTrapFactory;
    };
    MDCDrawer.prototype.initialSyncWithDOM = function () {
        var _this = this;
        var MODAL = cssClasses.MODAL;
        var SCRIM_SELECTOR = strings.SCRIM_SELECTOR;
        this.scrim_ = this.root_.parentNode.querySelector(SCRIM_SELECTOR);
        if (this.scrim_ && this.root_.classList.contains(MODAL)) {
            this.handleScrimClick_ = function () { return _this.foundation_.handleScrimClick(); };
            this.scrim_.addEventListener('click', this.handleScrimClick_);
            this.focusTrap_ = _util__WEBPACK_IMPORTED_MODULE_7__["createFocusTrapInstance"](this.root_, this.focusTrapFactory_);
        }
        this.handleKeydown_ = function (evt) { return _this.foundation_.handleKeydown(evt); };
        this.handleTransitionEnd_ = function (evt) { return _this.foundation_.handleTransitionEnd(evt); };
        this.listen('keydown', this.handleKeydown_);
        this.listen('transitionend', this.handleTransitionEnd_);
    };
    MDCDrawer.prototype.destroy = function () {
        this.unlisten('keydown', this.handleKeydown_);
        this.unlisten('transitionend', this.handleTransitionEnd_);
        if (this.list_) {
            this.list_.destroy();
        }
        var MODAL = cssClasses.MODAL;
        if (this.scrim_ && this.handleScrimClick_ && this.root_.classList.contains(MODAL)) {
            this.scrim_.removeEventListener('click', this.handleScrimClick_);
            // Ensure drawer is closed to hide scrim and release focus
            this.open = false;
        }
    };
    MDCDrawer.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            elementHasClass: function (element, className) { return element.classList.contains(className); },
            saveFocus: function () { return _this.previousFocus_ = document.activeElement; },
            restoreFocus: function () {
                var previousFocus = _this.previousFocus_;
                if (previousFocus && previousFocus.focus && _this.root_.contains(document.activeElement)) {
                    previousFocus.focus();
                }
            },
            focusActiveNavigationItem: function () {
                var activeNavItemEl = _this.root_.querySelector("." + _material_list_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCListFoundation"].cssClasses.LIST_ITEM_ACTIVATED_CLASS);
                if (activeNavItemEl) {
                    activeNavItemEl.focus();
                }
            },
            notifyClose: function () { return _this.emit(strings.CLOSE_EVENT, {}, true /* shouldBubble */); },
            notifyOpen: function () { return _this.emit(strings.OPEN_EVENT, {}, true /* shouldBubble */); },
            trapFocus: function () { return _this.focusTrap_.activate(); },
            releaseFocus: function () { return _this.focusTrap_.deactivate(); },
        };
        // tslint:enable:object-literal-sort-keys
        var DISMISSIBLE = cssClasses.DISMISSIBLE, MODAL = cssClasses.MODAL;
        if (this.root_.classList.contains(DISMISSIBLE)) {
            return new _dismissible_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCDismissibleDrawerFoundation"](adapter);
        }
        else if (this.root_.classList.contains(MODAL)) {
            return new _modal_foundation__WEBPACK_IMPORTED_MODULE_6__["MDCModalDrawerFoundation"](adapter);
        }
        else {
            throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + DISMISSIBLE + " and " + MODAL + ".");
        }
    };
    return MDCDrawer;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]));

//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/@material/drawer/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/drawer/constants.js ***!
  \****************************************************/
/*! exports provided: cssClasses, strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    ANIMATE: 'mdc-drawer--animate',
    CLOSING: 'mdc-drawer--closing',
    DISMISSIBLE: 'mdc-drawer--dismissible',
    MODAL: 'mdc-drawer--modal',
    OPEN: 'mdc-drawer--open',
    OPENING: 'mdc-drawer--opening',
    ROOT: 'mdc-drawer',
};
var strings = {
    APP_CONTENT_SELECTOR: '.mdc-drawer-app-content',
    CLOSE_EVENT: 'MDCDrawer:closed',
    OPEN_EVENT: 'MDCDrawer:opened',
    SCRIM_SELECTOR: '.mdc-drawer-scrim',
};

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@material/drawer/dismissible/foundation.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@material/drawer/dismissible/foundation.js ***!
  \*****************************************************************/
/*! exports provided: MDCDismissibleDrawerFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCDismissibleDrawerFoundation", function() { return MDCDismissibleDrawerFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/drawer/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var MDCDismissibleDrawerFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCDismissibleDrawerFoundation, _super);
    function MDCDismissibleDrawerFoundation(adapter) {
        var _this = _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCDismissibleDrawerFoundation.defaultAdapter, adapter)) || this;
        _this.animationFrame_ = 0;
        _this.animationTimer_ = 0;
        return _this;
    }
    Object.defineProperty(MDCDismissibleDrawerFoundation, "strings", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCDismissibleDrawerFoundation, "cssClasses", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCDismissibleDrawerFoundation, "defaultAdapter", {
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                elementHasClass: function () { return false; },
                notifyClose: function () { return undefined; },
                notifyOpen: function () { return undefined; },
                saveFocus: function () { return undefined; },
                restoreFocus: function () { return undefined; },
                focusActiveNavigationItem: function () { return undefined; },
                trapFocus: function () { return undefined; },
                releaseFocus: function () { return undefined; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
    });
    MDCDismissibleDrawerFoundation.prototype.destroy = function () {
        if (this.animationFrame_) {
            cancelAnimationFrame(this.animationFrame_);
        }
        if (this.animationTimer_) {
            clearTimeout(this.animationTimer_);
        }
    };
    /**
     * Opens the drawer from the closed state.
     */
    MDCDismissibleDrawerFoundation.prototype.open = function () {
        var _this = this;
        if (this.isOpen() || this.isOpening() || this.isClosing()) {
            return;
        }
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN);
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANIMATE);
        // Wait a frame once display is no longer "none", to establish basis for animation
        this.runNextAnimationFrame_(function () {
            _this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING);
        });
        this.adapter_.saveFocus();
    };
    /**
     * Closes the drawer from the open state.
     */
    MDCDismissibleDrawerFoundation.prototype.close = function () {
        if (!this.isOpen() || this.isOpening() || this.isClosing()) {
            return;
        }
        this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING);
    };
    /**
     * Returns true if the drawer is in the open position.
     * @return true if drawer is in open state.
     */
    MDCDismissibleDrawerFoundation.prototype.isOpen = function () {
        return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN);
    };
    /**
     * Returns true if the drawer is animating open.
     * @return true if drawer is animating open.
     */
    MDCDismissibleDrawerFoundation.prototype.isOpening = function () {
        return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING) || this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANIMATE);
    };
    /**
     * Returns true if the drawer is animating closed.
     * @return true if drawer is animating closed.
     */
    MDCDismissibleDrawerFoundation.prototype.isClosing = function () {
        return this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING);
    };
    /**
     * Keydown handler to close drawer when key is escape.
     */
    MDCDismissibleDrawerFoundation.prototype.handleKeydown = function (evt) {
        var keyCode = evt.keyCode, key = evt.key;
        var isEscape = key === 'Escape' || keyCode === 27;
        if (isEscape) {
            this.close();
        }
    };
    /**
     * Handles the `transitionend` event when the drawer finishes opening/closing.
     */
    MDCDismissibleDrawerFoundation.prototype.handleTransitionEnd = function (evt) {
        var OPENING = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPENING, CLOSING = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].CLOSING, OPEN = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].OPEN, ANIMATE = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ANIMATE, ROOT = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].ROOT;
        // In Edge, transitionend on ripple pseudo-elements yields a target without classList, so check for Element first.
        var isRootElement = this.isElement_(evt.target) && this.adapter_.elementHasClass(evt.target, ROOT);
        if (!isRootElement) {
            return;
        }
        if (this.isClosing()) {
            this.adapter_.removeClass(OPEN);
            this.closed_();
            this.adapter_.restoreFocus();
            this.adapter_.notifyClose();
        }
        else {
            this.adapter_.focusActiveNavigationItem();
            this.opened_();
            this.adapter_.notifyOpen();
        }
        this.adapter_.removeClass(ANIMATE);
        this.adapter_.removeClass(OPENING);
        this.adapter_.removeClass(CLOSING);
    };
    /**
     * Extension point for when drawer finishes open animation.
     */
    MDCDismissibleDrawerFoundation.prototype.opened_ = function () { }; // tslint:disable-line:no-empty
    /**
     * Extension point for when drawer finishes close animation.
     */
    MDCDismissibleDrawerFoundation.prototype.closed_ = function () { }; // tslint:disable-line:no-empty
    /**
     * Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
     */
    MDCDismissibleDrawerFoundation.prototype.runNextAnimationFrame_ = function (callback) {
        var _this = this;
        cancelAnimationFrame(this.animationFrame_);
        this.animationFrame_ = requestAnimationFrame(function () {
            _this.animationFrame_ = 0;
            clearTimeout(_this.animationTimer_);
            _this.animationTimer_ = setTimeout(callback, 0);
        });
    };
    MDCDismissibleDrawerFoundation.prototype.isElement_ = function (element) {
        // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
        return Boolean(element.classList);
    };
    return MDCDismissibleDrawerFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCDismissibleDrawerFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/drawer/index.js":
/*!************************************************!*\
  !*** ./node_modules/@material/drawer/index.js ***!
  \************************************************/
/*! exports provided: util, MDCDrawer, cssClasses, strings, MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/@material/drawer/util.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./node_modules/@material/drawer/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCDrawer", function() { return _component__WEBPACK_IMPORTED_MODULE_1__["MDCDrawer"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/drawer/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"]; });

/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dismissible/foundation */ "./node_modules/@material/drawer/dismissible/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCDismissibleDrawerFoundation", function() { return _dismissible_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCDismissibleDrawerFoundation"]; });

/* harmony import */ var _modal_foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal/foundation */ "./node_modules/@material/drawer/modal/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCModalDrawerFoundation", function() { return _modal_foundation__WEBPACK_IMPORTED_MODULE_4__["MDCModalDrawerFoundation"]; });

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@material/drawer/modal/foundation.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material/drawer/modal/foundation.js ***!
  \***********************************************************/
/*! exports provided: MDCModalDrawerFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCModalDrawerFoundation", function() { return MDCModalDrawerFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dismissible/foundation */ "./node_modules/@material/drawer/dismissible/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* istanbul ignore next: subclass is not a branch statement */
var MDCModalDrawerFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCModalDrawerFoundation, _super);
    function MDCModalDrawerFoundation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handles click event on scrim.
     */
    MDCModalDrawerFoundation.prototype.handleScrimClick = function () {
        this.close();
    };
    /**
     * Called when drawer finishes open animation.
     */
    MDCModalDrawerFoundation.prototype.opened_ = function () {
        this.adapter_.trapFocus();
    };
    /**
     * Called when drawer finishes close animation.
     */
    MDCModalDrawerFoundation.prototype.closed_ = function () {
        this.adapter_.releaseFocus();
    };
    return MDCModalDrawerFoundation;
}(_dismissible_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCDismissibleDrawerFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCModalDrawerFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/drawer/util.js":
/*!***********************************************!*\
  !*** ./node_modules/@material/drawer/util.js ***!
  \***********************************************/
/*! exports provided: createFocusTrapInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFocusTrapInstance", function() { return createFocusTrapInstance; });
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-trap */ "./node_modules/focus-trap/index.js");
/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(focus_trap__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

function createFocusTrapInstance(surfaceEl, focusTrapFactory) {
    if (focusTrapFactory === void 0) { focusTrapFactory = focus_trap__WEBPACK_IMPORTED_MODULE_0___default.a; }
    return focusTrapFactory(surfaceEl, {
        clickOutsideDeactivates: true,
        escapeDeactivates: false,
        initialFocus: undefined,
        returnFocusOnDeactivate: false,
    });
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/@material/list/component.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/list/component.js ***!
  \**************************************************/
/*! exports provided: MDCList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCList", function() { return MDCList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/dom/ponyfill */ "./node_modules/@material/dom/ponyfill.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/list/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/list/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */





var MDCList = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCList, _super);
    function MDCList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MDCList.prototype, "vertical", {
        set: function (value) {
            this.foundation_.setVerticalOrientation(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "listElements", {
        get: function () {
            return [].slice.call(this.root_.querySelectorAll("." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "wrapFocus", {
        set: function (value) {
            this.foundation_.setWrapFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "singleSelection", {
        set: function (isSingleSelectionList) {
            this.foundation_.setSingleSelection(isSingleSelectionList);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCList.prototype, "selectedIndex", {
        get: function () {
            return this.foundation_.getSelectedIndex();
        },
        set: function (index) {
            this.foundation_.setSelectedIndex(index);
        },
        enumerable: true,
        configurable: true
    });
    MDCList.attachTo = function (root) {
        return new MDCList(root);
    };
    MDCList.prototype.initialSyncWithDOM = function () {
        this.handleClick_ = this.handleClickEvent_.bind(this);
        this.handleKeydown_ = this.handleKeydownEvent_.bind(this);
        this.focusInEventListener_ = this.handleFocusInEvent_.bind(this);
        this.focusOutEventListener_ = this.handleFocusOutEvent_.bind(this);
        this.listen('keydown', this.handleKeydown_);
        this.listen('click', this.handleClick_);
        this.listen('focusin', this.focusInEventListener_);
        this.listen('focusout', this.focusOutEventListener_);
        this.layout();
        this.initializeListType();
    };
    MDCList.prototype.destroy = function () {
        this.unlisten('keydown', this.handleKeydown_);
        this.unlisten('click', this.handleClick_);
        this.unlisten('focusin', this.focusInEventListener_);
        this.unlisten('focusout', this.focusOutEventListener_);
    };
    MDCList.prototype.layout = function () {
        var direction = this.root_.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ORIENTATION);
        this.vertical = direction !== _constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ORIENTATION_HORIZONTAL;
        // List items need to have at least tabindex=-1 to be focusable.
        [].slice.call(this.root_.querySelectorAll('.mdc-list-item:not([tabindex])'))
            .forEach(function (el) {
            el.setAttribute('tabindex', '-1');
        });
        // Child button/a elements are not tabbable until the list item is focused.
        [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].FOCUSABLE_CHILD_ELEMENTS))
            .forEach(function (el) { return el.setAttribute('tabindex', '-1'); });
        this.foundation_.layout();
    };
    /**
     * Initialize selectedIndex value based on pre-selected checkbox list items, single selection or radio.
     */
    MDCList.prototype.initializeListType = function () {
        var _this = this;
        var checkboxListItems = this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_ROLE_CHECKBOX_SELECTOR);
        var singleSelectedListItem = this.root_.querySelector("\n      ." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS + ",\n      ." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_SELECTED_CLASS + "\n    ");
        var radioSelectedListItem = this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_CHECKED_RADIO_SELECTOR);
        if (checkboxListItems.length) {
            var preselectedItems = this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ARIA_CHECKED_CHECKBOX_SELECTOR);
            this.selectedIndex =
                [].map.call(preselectedItems, function (listItem) { return _this.listElements.indexOf(listItem); });
        }
        else if (singleSelectedListItem) {
            if (singleSelectedListItem.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS)) {
                this.foundation_.setUseActivatedClass(true);
            }
            this.singleSelection = true;
            this.selectedIndex = this.listElements.indexOf(singleSelectedListItem);
        }
        else if (radioSelectedListItem) {
            this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
        }
    };
    MDCList.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        var adapter = {
            addClassForElementIndex: function (index, className) {
                var element = _this.listElements[index];
                if (element) {
                    element.classList.add(className);
                }
            },
            focusItemAtIndex: function (index) {
                var element = _this.listElements[index];
                if (element) {
                    element.focus();
                }
            },
            getAttributeForElementIndex: function (index, attr) { return _this.listElements[index].getAttribute(attr); },
            getFocusedElementIndex: function () { return _this.listElements.indexOf(document.activeElement); },
            getListItemCount: function () { return _this.listElements.length; },
            hasCheckboxAtIndex: function (index) {
                var listItem = _this.listElements[index];
                return !!listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_SELECTOR);
            },
            hasRadioAtIndex: function (index) {
                var listItem = _this.listElements[index];
                return !!listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].RADIO_SELECTOR);
            },
            isCheckboxCheckedAtIndex: function (index) {
                var listItem = _this.listElements[index];
                var toggleEl = listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_SELECTOR);
                return toggleEl.checked;
            },
            isFocusInsideList: function () {
                return _this.root_.contains(document.activeElement);
            },
            isRootFocused: function () { return document.activeElement === _this.root_; },
            notifyAction: function (index) {
                _this.emit(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_EVENT, { index: index }, /** shouldBubble */ true);
            },
            removeClassForElementIndex: function (index, className) {
                var element = _this.listElements[index];
                if (element) {
                    element.classList.remove(className);
                }
            },
            setAttributeForElementIndex: function (index, attr, value) {
                var element = _this.listElements[index];
                if (element) {
                    element.setAttribute(attr, value);
                }
            },
            setCheckedCheckboxOrRadioAtIndex: function (index, isChecked) {
                var listItem = _this.listElements[index];
                var toggleEl = listItem.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_RADIO_SELECTOR);
                toggleEl.checked = isChecked;
                var event = document.createEvent('Event');
                event.initEvent('change', true, true);
                toggleEl.dispatchEvent(event);
            },
            setTabIndexForListItemChildren: function (listItemIndex, tabIndexValue) {
                var element = _this.listElements[listItemIndex];
                var listItemChildren = [].slice.call(element.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
                listItemChildren.forEach(function (el) { return el.setAttribute('tabindex', tabIndexValue); });
            },
        };
        return new _foundation__WEBPACK_IMPORTED_MODULE_4__["MDCListFoundation"](adapter);
    };
    /**
     * Used to figure out which list item this event is targetting. Or returns -1 if
     * there is no list item
     */
    MDCList.prototype.getListItemIndex_ = function (evt) {
        var eventTarget = evt.target;
        var nearestParent = Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__["closest"])(eventTarget, "." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS + ", ." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].ROOT);
        // Get the index of the element if it is a list item.
        if (nearestParent && Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__["matches"])(nearestParent, "." + _constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS)) {
            return this.listElements.indexOf(nearestParent);
        }
        return -1;
    };
    /**
     * Used to figure out which element was clicked before sending the event to the foundation.
     */
    MDCList.prototype.handleFocusInEvent_ = function (evt) {
        var index = this.getListItemIndex_(evt);
        this.foundation_.handleFocusIn(evt, index);
    };
    /**
     * Used to figure out which element was clicked before sending the event to the foundation.
     */
    MDCList.prototype.handleFocusOutEvent_ = function (evt) {
        var index = this.getListItemIndex_(evt);
        this.foundation_.handleFocusOut(evt, index);
    };
    /**
     * Used to figure out which element was focused when keydown event occurred before sending the event to the
     * foundation.
     */
    MDCList.prototype.handleKeydownEvent_ = function (evt) {
        var index = this.getListItemIndex_(evt);
        var target = evt.target;
        this.foundation_.handleKeydown(evt, target.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].LIST_ITEM_CLASS), index);
    };
    /**
     * Used to figure out which element was clicked before sending the event to the foundation.
     */
    MDCList.prototype.handleClickEvent_ = function (evt) {
        var index = this.getListItemIndex_(evt);
        var target = evt.target;
        // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
        var toggleCheckbox = !Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_2__["matches"])(target, _constants__WEBPACK_IMPORTED_MODULE_3__["strings"].CHECKBOX_RADIO_SELECTOR);
        this.foundation_.handleClick(index, toggleCheckbox);
    };
    return MDCList;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]));

//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/@material/list/constants.js":
/*!**************************************************!*\
  !*** ./node_modules/@material/list/constants.js ***!
  \**************************************************/
/*! exports provided: strings, cssClasses, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    LIST_ITEM_ACTIVATED_CLASS: 'mdc-list-item--activated',
    LIST_ITEM_CLASS: 'mdc-list-item',
    LIST_ITEM_DISABLED_CLASS: 'mdc-list-item--disabled',
    LIST_ITEM_SELECTED_CLASS: 'mdc-list-item--selected',
    ROOT: 'mdc-list',
};
var strings = {
    ACTION_EVENT: 'MDCList:action',
    ARIA_CHECKED: 'aria-checked',
    ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
    ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
    ARIA_CURRENT: 'aria-current',
    ARIA_ORIENTATION: 'aria-orientation',
    ARIA_ORIENTATION_HORIZONTAL: 'horizontal',
    ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
    ARIA_SELECTED: 'aria-selected',
    CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"]:not(:disabled), input[type="radio"]:not(:disabled)',
    CHECKBOX_SELECTOR: 'input[type="checkbox"]:not(:disabled)',
    CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a\n  ",
    FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"radio\"]:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " input[type=\"checkbox\"]:not(:disabled)\n  ",
    RADIO_SELECTOR: 'input[type="radio"]:not(:disabled)',
};
var numbers = {
    UNSET_INDEX: -1,
};

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@material/list/foundation.js":
/*!***************************************************!*\
  !*** ./node_modules/@material/list/foundation.js ***!
  \***************************************************/
/*! exports provided: MDCListFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCListFoundation", function() { return MDCListFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/list/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var ELEMENTS_KEY_ALLOWED_IN = ['input', 'button', 'textarea', 'select'];
function isNumberArray(selectedIndex) {
    return selectedIndex instanceof Array;
}
var MDCListFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCListFoundation, _super);
    function MDCListFoundation(adapter) {
        var _this = _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCListFoundation.defaultAdapter, adapter)) || this;
        _this.wrapFocus_ = false;
        _this.isVertical_ = true;
        _this.isSingleSelectionList_ = false;
        _this.selectedIndex_ = _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX;
        _this.focusedItemIndex_ = _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX;
        _this.useActivatedClass_ = false;
        _this.ariaCurrentAttrValue_ = null;
        _this.isCheckboxList_ = false;
        _this.isRadioList_ = false;
        return _this;
    }
    Object.defineProperty(MDCListFoundation, "strings", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "cssClasses", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "numbers", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCListFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClassForElementIndex: function () { return undefined; },
                focusItemAtIndex: function () { return undefined; },
                getAttributeForElementIndex: function () { return null; },
                getFocusedElementIndex: function () { return 0; },
                getListItemCount: function () { return 0; },
                hasCheckboxAtIndex: function () { return false; },
                hasRadioAtIndex: function () { return false; },
                isCheckboxCheckedAtIndex: function () { return false; },
                isFocusInsideList: function () { return false; },
                isRootFocused: function () { return false; },
                notifyAction: function () { return undefined; },
                removeClassForElementIndex: function () { return undefined; },
                setAttributeForElementIndex: function () { return undefined; },
                setCheckedCheckboxOrRadioAtIndex: function () { return undefined; },
                setTabIndexForListItemChildren: function () { return undefined; },
            };
        },
        enumerable: true,
        configurable: true
    });
    MDCListFoundation.prototype.layout = function () {
        if (this.adapter_.getListItemCount() === 0) {
            return;
        }
        if (this.adapter_.hasCheckboxAtIndex(0)) {
            this.isCheckboxList_ = true;
        }
        else if (this.adapter_.hasRadioAtIndex(0)) {
            this.isRadioList_ = true;
        }
    };
    /**
     * Sets the private wrapFocus_ variable.
     */
    MDCListFoundation.prototype.setWrapFocus = function (value) {
        this.wrapFocus_ = value;
    };
    /**
     * Sets the isVertical_ private variable.
     */
    MDCListFoundation.prototype.setVerticalOrientation = function (value) {
        this.isVertical_ = value;
    };
    /**
     * Sets the isSingleSelectionList_ private variable.
     */
    MDCListFoundation.prototype.setSingleSelection = function (value) {
        this.isSingleSelectionList_ = value;
    };
    /**
     * Sets the useActivatedClass_ private variable.
     */
    MDCListFoundation.prototype.setUseActivatedClass = function (useActivated) {
        this.useActivatedClass_ = useActivated;
    };
    MDCListFoundation.prototype.getSelectedIndex = function () {
        return this.selectedIndex_;
    };
    MDCListFoundation.prototype.setSelectedIndex = function (index) {
        if (!this.isIndexValid_(index)) {
            return;
        }
        if (this.isCheckboxList_) {
            this.setCheckboxAtIndex_(index);
        }
        else if (this.isRadioList_) {
            this.setRadioAtIndex_(index);
        }
        else {
            this.setSingleSelectionAtIndex_(index);
        }
    };
    /**
     * Focus in handler for the list items.
     */
    MDCListFoundation.prototype.handleFocusIn = function (_, listItemIndex) {
        if (listItemIndex >= 0) {
            this.adapter_.setTabIndexForListItemChildren(listItemIndex, '0');
        }
    };
    /**
     * Focus out handler for the list items.
     */
    MDCListFoundation.prototype.handleFocusOut = function (_, listItemIndex) {
        var _this = this;
        if (listItemIndex >= 0) {
            this.adapter_.setTabIndexForListItemChildren(listItemIndex, '-1');
        }
        /**
         * Between Focusout & Focusin some browsers do not have focus on any element. Setting a delay to wait till the focus
         * is moved to next element.
         */
        setTimeout(function () {
            if (!_this.adapter_.isFocusInsideList()) {
                _this.setTabindexToFirstSelectedItem_();
            }
        }, 0);
    };
    /**
     * Key handler for the list.
     */
    MDCListFoundation.prototype.handleKeydown = function (evt, isRootListItem, listItemIndex) {
        var isArrowLeft = evt.key === 'ArrowLeft' || evt.keyCode === 37;
        var isArrowUp = evt.key === 'ArrowUp' || evt.keyCode === 38;
        var isArrowRight = evt.key === 'ArrowRight' || evt.keyCode === 39;
        var isArrowDown = evt.key === 'ArrowDown' || evt.keyCode === 40;
        var isHome = evt.key === 'Home' || evt.keyCode === 36;
        var isEnd = evt.key === 'End' || evt.keyCode === 35;
        var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
        var isSpace = evt.key === 'Space' || evt.keyCode === 32;
        if (this.adapter_.isRootFocused()) {
            if (isArrowUp || isEnd) {
                evt.preventDefault();
                this.focusLastElement();
            }
            else if (isArrowDown || isHome) {
                evt.preventDefault();
                this.focusFirstElement();
            }
            return;
        }
        var currentIndex = this.adapter_.getFocusedElementIndex();
        if (currentIndex === -1) {
            currentIndex = listItemIndex;
            if (currentIndex < 0) {
                // If this event doesn't have a mdc-list-item ancestor from the
                // current list (not from a sublist), return early.
                return;
            }
        }
        var nextIndex;
        if ((this.isVertical_ && isArrowDown) || (!this.isVertical_ && isArrowRight)) {
            this.preventDefaultEvent_(evt);
            nextIndex = this.focusNextElement(currentIndex);
        }
        else if ((this.isVertical_ && isArrowUp) || (!this.isVertical_ && isArrowLeft)) {
            this.preventDefaultEvent_(evt);
            nextIndex = this.focusPrevElement(currentIndex);
        }
        else if (isHome) {
            this.preventDefaultEvent_(evt);
            nextIndex = this.focusFirstElement();
        }
        else if (isEnd) {
            this.preventDefaultEvent_(evt);
            nextIndex = this.focusLastElement();
        }
        else if (isEnter || isSpace) {
            if (isRootListItem) {
                // Return early if enter key is pressed on anchor element which triggers synthetic MouseEvent event.
                var target = evt.target;
                if (target && target.tagName === 'A' && isEnter) {
                    return;
                }
                this.preventDefaultEvent_(evt);
                if (this.isSelectableList_()) {
                    this.setSelectedIndexOnAction_(currentIndex);
                }
                this.adapter_.notifyAction(currentIndex);
            }
        }
        this.focusedItemIndex_ = currentIndex;
        if (nextIndex !== undefined) {
            this.setTabindexAtIndex_(nextIndex);
            this.focusedItemIndex_ = nextIndex;
        }
    };
    /**
     * Click handler for the list.
     */
    MDCListFoundation.prototype.handleClick = function (index, toggleCheckbox) {
        if (index === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
            return;
        }
        if (this.isSelectableList_()) {
            this.setSelectedIndexOnAction_(index, toggleCheckbox);
        }
        this.adapter_.notifyAction(index);
        this.setTabindexAtIndex_(index);
        this.focusedItemIndex_ = index;
    };
    /**
     * Focuses the next element on the list.
     */
    MDCListFoundation.prototype.focusNextElement = function (index) {
        var count = this.adapter_.getListItemCount();
        var nextIndex = index + 1;
        if (nextIndex >= count) {
            if (this.wrapFocus_) {
                nextIndex = 0;
            }
            else {
                // Return early because last item is already focused.
                return index;
            }
        }
        this.adapter_.focusItemAtIndex(nextIndex);
        return nextIndex;
    };
    /**
     * Focuses the previous element on the list.
     */
    MDCListFoundation.prototype.focusPrevElement = function (index) {
        var prevIndex = index - 1;
        if (prevIndex < 0) {
            if (this.wrapFocus_) {
                prevIndex = this.adapter_.getListItemCount() - 1;
            }
            else {
                // Return early because first item is already focused.
                return index;
            }
        }
        this.adapter_.focusItemAtIndex(prevIndex);
        return prevIndex;
    };
    MDCListFoundation.prototype.focusFirstElement = function () {
        this.adapter_.focusItemAtIndex(0);
        return 0;
    };
    MDCListFoundation.prototype.focusLastElement = function () {
        var lastIndex = this.adapter_.getListItemCount() - 1;
        this.adapter_.focusItemAtIndex(lastIndex);
        return lastIndex;
    };
    /**
     * Ensures that preventDefault is only called if the containing element doesn't
     * consume the event, and it will cause an unintended scroll.
     */
    MDCListFoundation.prototype.preventDefaultEvent_ = function (evt) {
        var target = evt.target;
        var tagName = ("" + target.tagName).toLowerCase();
        if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
            evt.preventDefault();
        }
    };
    MDCListFoundation.prototype.setSingleSelectionAtIndex_ = function (index) {
        if (this.selectedIndex_ === index) {
            return;
        }
        var selectedClassName = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_SELECTED_CLASS;
        if (this.useActivatedClass_) {
            selectedClassName = _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"].LIST_ITEM_ACTIVATED_CLASS;
        }
        if (this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
            this.adapter_.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
        }
        this.adapter_.addClassForElementIndex(index, selectedClassName);
        this.setAriaForSingleSelectionAtIndex_(index);
        this.selectedIndex_ = index;
    };
    /**
     * Sets aria attribute for single selection at given index.
     */
    MDCListFoundation.prototype.setAriaForSingleSelectionAtIndex_ = function (index) {
        // Detect the presence of aria-current and get the value only during list initialization when it is in unset state.
        if (this.selectedIndex_ === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
            this.ariaCurrentAttrValue_ =
                this.adapter_.getAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CURRENT);
        }
        var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
        var ariaAttribute = isAriaCurrent ? _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CURRENT : _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_SELECTED;
        if (this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
            this.adapter_.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, 'false');
        }
        var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : 'true';
        this.adapter_.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
    };
    /**
     * Toggles radio at give index. Radio doesn't change the checked state if it is already checked.
     */
    MDCListFoundation.prototype.setRadioAtIndex_ = function (index) {
        this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, true);
        if (this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
            this.adapter_.setAttributeForElementIndex(this.selectedIndex_, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, 'false');
        }
        this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, 'true');
        this.selectedIndex_ = index;
    };
    MDCListFoundation.prototype.setCheckboxAtIndex_ = function (index) {
        for (var i = 0; i < this.adapter_.getListItemCount(); i++) {
            var isChecked = false;
            if (index.indexOf(i) >= 0) {
                isChecked = true;
            }
            this.adapter_.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
            this.adapter_.setAttributeForElementIndex(i, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, isChecked ? 'true' : 'false');
        }
        this.selectedIndex_ = index;
    };
    MDCListFoundation.prototype.setTabindexAtIndex_ = function (index) {
        if (this.focusedItemIndex_ === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX && index !== 0) {
            // If no list item was selected set first list item's tabindex to -1.
            // Generally, tabindex is set to 0 on first list item of list that has no preselected items.
            this.adapter_.setAttributeForElementIndex(0, 'tabindex', '-1');
        }
        else if (this.focusedItemIndex_ >= 0 && this.focusedItemIndex_ !== index) {
            this.adapter_.setAttributeForElementIndex(this.focusedItemIndex_, 'tabindex', '-1');
        }
        this.adapter_.setAttributeForElementIndex(index, 'tabindex', '0');
    };
    /**
     * @return Return true if it is single selectin list, checkbox list or radio list.
     */
    MDCListFoundation.prototype.isSelectableList_ = function () {
        return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
    };
    MDCListFoundation.prototype.setTabindexToFirstSelectedItem_ = function () {
        var targetIndex = 0;
        if (this.isSelectableList_()) {
            if (typeof this.selectedIndex_ === 'number' && this.selectedIndex_ !== _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX) {
                targetIndex = this.selectedIndex_;
            }
            else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
                targetIndex = this.selectedIndex_.reduce(function (currentIndex, minIndex) { return Math.min(currentIndex, minIndex); });
            }
        }
        this.setTabindexAtIndex_(targetIndex);
    };
    MDCListFoundation.prototype.isIndexValid_ = function (index) {
        var _this = this;
        if (index instanceof Array) {
            if (!this.isCheckboxList_) {
                throw new Error('MDCListFoundation: Array of index is only supported for checkbox based list');
            }
            if (index.length === 0) {
                return true;
            }
            else {
                return index.some(function (i) { return _this.isIndexInRange_(i); });
            }
        }
        else if (typeof index === 'number') {
            if (this.isCheckboxList_) {
                throw new Error('MDCListFoundation: Expected array of index for checkbox based list but got number: ' + index);
            }
            return this.isIndexInRange_(index);
        }
        else {
            return false;
        }
    };
    MDCListFoundation.prototype.isIndexInRange_ = function (index) {
        var listSize = this.adapter_.getListItemCount();
        return index >= 0 && index < listSize;
    };
    MDCListFoundation.prototype.setSelectedIndexOnAction_ = function (index, toggleCheckbox) {
        if (toggleCheckbox === void 0) { toggleCheckbox = true; }
        if (this.isCheckboxList_) {
            this.toggleCheckboxAtIndex_(index, toggleCheckbox);
        }
        else {
            this.setSelectedIndex(index);
        }
    };
    MDCListFoundation.prototype.toggleCheckboxAtIndex_ = function (index, toggleCheckbox) {
        var isChecked = this.adapter_.isCheckboxCheckedAtIndex(index);
        if (toggleCheckbox) {
            isChecked = !isChecked;
            this.adapter_.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
        }
        this.adapter_.setAttributeForElementIndex(index, _constants__WEBPACK_IMPORTED_MODULE_2__["strings"].ARIA_CHECKED, isChecked ? 'true' : 'false');
        // If none of the checkbox items are selected and selectedIndex is not initialized then provide a default value.
        var selectedIndexes = this.selectedIndex_ === _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].UNSET_INDEX ? [] : this.selectedIndex_.slice();
        if (isChecked) {
            selectedIndexes.push(index);
        }
        else {
            selectedIndexes = selectedIndexes.filter(function (i) { return i !== index; });
        }
        this.selectedIndex_ = selectedIndexes;
    };
    return MDCListFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCListFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/ripple/component.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/ripple/component.js ***!
  \****************************************************/
/*! exports provided: MDCRipple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCRipple", function() { return MDCRipple; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _material_dom_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/dom/events */ "./node_modules/@material/dom/events.js");
/* harmony import */ var _material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material/dom/ponyfill */ "./node_modules/@material/dom/ponyfill.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/ripple/foundation.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./node_modules/@material/ripple/util.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






var MDCRipple = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCRipple, _super);
    function MDCRipple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disabled = false;
        return _this;
    }
    MDCRipple.attachTo = function (root, opts) {
        if (opts === void 0) { opts = { isUnbounded: undefined }; }
        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (opts.isUnbounded !== undefined) {
            ripple.unbounded = opts.isUnbounded;
        }
        return ripple;
    };
    MDCRipple.createAdapter = function (instance) {
        return {
            addClass: function (className) { return instance.root_.classList.add(className); },
            browserSupportsCssVars: function () { return _util__WEBPACK_IMPORTED_MODULE_5__["supportsCssVariables"](window); },
            computeBoundingRect: function () { return instance.root_.getBoundingClientRect(); },
            containsEventTarget: function (target) { return instance.root_.contains(target); },
            deregisterDocumentInteractionHandler: function (evtType, handler) {
                return document.documentElement.removeEventListener(evtType, handler, Object(_material_dom_events__WEBPACK_IMPORTED_MODULE_2__["applyPassive"])());
            },
            deregisterInteractionHandler: function (evtType, handler) {
                return instance.root_.removeEventListener(evtType, handler, Object(_material_dom_events__WEBPACK_IMPORTED_MODULE_2__["applyPassive"])());
            },
            deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
            getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); },
            isSurfaceActive: function () { return Object(_material_dom_ponyfill__WEBPACK_IMPORTED_MODULE_3__["matches"])(instance.root_, ':active'); },
            isSurfaceDisabled: function () { return Boolean(instance.disabled); },
            isUnbounded: function () { return Boolean(instance.unbounded); },
            registerDocumentInteractionHandler: function (evtType, handler) {
                return document.documentElement.addEventListener(evtType, handler, Object(_material_dom_events__WEBPACK_IMPORTED_MODULE_2__["applyPassive"])());
            },
            registerInteractionHandler: function (evtType, handler) {
                return instance.root_.addEventListener(evtType, handler, Object(_material_dom_events__WEBPACK_IMPORTED_MODULE_2__["applyPassive"])());
            },
            registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
            removeClass: function (className) { return instance.root_.classList.remove(className); },
            updateCssVariable: function (varName, value) { return instance.root_.style.setProperty(varName, value); },
        };
    };
    Object.defineProperty(MDCRipple.prototype, "unbounded", {
        get: function () {
            return Boolean(this.unbounded_);
        },
        set: function (unbounded) {
            this.unbounded_ = Boolean(unbounded);
            this.setUnbounded_();
        },
        enumerable: true,
        configurable: true
    });
    MDCRipple.prototype.activate = function () {
        this.foundation_.activate();
    };
    MDCRipple.prototype.deactivate = function () {
        this.foundation_.deactivate();
    };
    MDCRipple.prototype.layout = function () {
        this.foundation_.layout();
    };
    MDCRipple.prototype.getDefaultFoundation = function () {
        return new _foundation__WEBPACK_IMPORTED_MODULE_4__["MDCRippleFoundation"](MDCRipple.createAdapter(this));
    };
    MDCRipple.prototype.initialSyncWithDOM = function () {
        var root = this.root_;
        this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
    };
    /**
     * Closure Compiler throws an access control error when directly accessing a
     * protected or private property inside a getter/setter, like unbounded above.
     * By accessing the protected property inside a method, we solve that problem.
     * That's why this function exists.
     */
    MDCRipple.prototype.setUnbounded_ = function () {
        this.foundation_.setUnbounded(Boolean(this.unbounded_));
    };
    return MDCRipple;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]));

//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/@material/ripple/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/ripple/constants.js ***!
  \****************************************************/
/*! exports provided: cssClasses, strings, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
};
var strings = {
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
};
var numbers = {
    DEACTIVATION_TIMEOUT_MS: 225,
    FG_DEACTIVATION_MS: 150,
    INITIAL_ORIGIN_SCALE: 0.6,
    PADDING: 10,
    TAP_DELAY_MS: 300,
};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@material/ripple/foundation.js":
/*!*****************************************************!*\
  !*** ./node_modules/@material/ripple/foundation.js ***!
  \*****************************************************/
/*! exports provided: MDCRippleFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCRippleFoundation", function() { return MDCRippleFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/ripple/constants.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util */ "./node_modules/@material/ripple/util.js");
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




// Activation events registered on the root element of each instance for activation
var ACTIVATION_EVENT_TYPES = [
    'touchstart', 'pointerdown', 'mousedown', 'keydown',
];
// Deactivation events registered on documentElement when a pointer-related down event occurs
var POINTER_DEACTIVATION_EVENT_TYPES = [
    'touchend', 'pointerup', 'mouseup', 'contextmenu',
];
// simultaneous nested activations
var activatedTargets = [];
var MDCRippleFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCRippleFoundation, _super);
    function MDCRippleFoundation(adapter) {
        var _this = _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;
        _this.activationAnimationHasEnded_ = false;
        _this.activationTimer_ = 0;
        _this.fgDeactivationRemovalTimer_ = 0;
        _this.fgScale_ = '0';
        _this.frame_ = { width: 0, height: 0 };
        _this.initialSize_ = 0;
        _this.layoutFrame_ = 0;
        _this.maxRadius_ = 0;
        _this.unboundedCoords_ = { left: 0, top: 0 };
        _this.activationState_ = _this.defaultActivationState_();
        _this.activationTimerCallback_ = function () {
            _this.activationAnimationHasEnded_ = true;
            _this.runDeactivationUXLogicIfReady_();
        };
        _this.activateHandler_ = function (e) { return _this.activate_(e); };
        _this.deactivateHandler_ = function () { return _this.deactivate_(); };
        _this.focusHandler_ = function () { return _this.handleFocus(); };
        _this.blurHandler_ = function () { return _this.handleBlur(); };
        _this.resizeHandler_ = function () { return _this.layout(); };
        return _this;
    }
    Object.defineProperty(MDCRippleFoundation, "cssClasses", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "strings", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "numbers", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClass: function () { return undefined; },
                browserSupportsCssVars: function () { return true; },
                computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                containsEventTarget: function () { return true; },
                deregisterDocumentInteractionHandler: function () { return undefined; },
                deregisterInteractionHandler: function () { return undefined; },
                deregisterResizeHandler: function () { return undefined; },
                getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                isSurfaceActive: function () { return true; },
                isSurfaceDisabled: function () { return true; },
                isUnbounded: function () { return true; },
                registerDocumentInteractionHandler: function () { return undefined; },
                registerInteractionHandler: function () { return undefined; },
                registerResizeHandler: function () { return undefined; },
                removeClass: function () { return undefined; },
                updateCssVariable: function () { return undefined; },
            };
        },
        enumerable: true,
        configurable: true
    });
    MDCRippleFoundation.prototype.init = function () {
        var _this = this;
        var supportsPressRipple = this.supportsPressRipple_();
        this.registerRootHandlers_(supportsPressRipple);
        if (supportsPressRipple) {
            var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter_.addClass(ROOT_1);
                if (_this.adapter_.isUnbounded()) {
                    _this.adapter_.addClass(UNBOUNDED_1);
                    // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                    _this.layoutInternal_();
                }
            });
        }
    };
    MDCRippleFoundation.prototype.destroy = function () {
        var _this = this;
        if (this.supportsPressRipple_()) {
            if (this.activationTimer_) {
                clearTimeout(this.activationTimer_);
                this.activationTimer_ = 0;
                this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
            }
            if (this.fgDeactivationRemovalTimer_) {
                clearTimeout(this.fgDeactivationRemovalTimer_);
                this.fgDeactivationRemovalTimer_ = 0;
                this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
            }
            var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
            requestAnimationFrame(function () {
                _this.adapter_.removeClass(ROOT_2);
                _this.adapter_.removeClass(UNBOUNDED_2);
                _this.removeCssVars_();
            });
        }
        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
    };
    /**
     * @param evt Optional event containing position information.
     */
    MDCRippleFoundation.prototype.activate = function (evt) {
        this.activate_(evt);
    };
    MDCRippleFoundation.prototype.deactivate = function () {
        this.deactivate_();
    };
    MDCRippleFoundation.prototype.layout = function () {
        var _this = this;
        if (this.layoutFrame_) {
            cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
            _this.layoutInternal_();
            _this.layoutFrame_ = 0;
        });
    };
    MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
        if (unbounded) {
            this.adapter_.addClass(UNBOUNDED);
        }
        else {
            this.adapter_.removeClass(UNBOUNDED);
        }
    };
    MDCRippleFoundation.prototype.handleFocus = function () {
        var _this = this;
        requestAnimationFrame(function () {
            return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    MDCRippleFoundation.prototype.handleBlur = function () {
        var _this = this;
        requestAnimationFrame(function () {
            return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
    };
    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     */
    MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
        return this.adapter_.browserSupportsCssVars();
    };
    MDCRippleFoundation.prototype.defaultActivationState_ = function () {
        return {
            activationEvent: undefined,
            hasDeactivationUXRun: false,
            isActivated: false,
            isProgrammatic: false,
            wasActivatedByPointer: false,
            wasElementMadeActive: false,
        };
    };
    /**
     * supportsPressRipple Passed from init to save a redundant function call
     */
    MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
        var _this = this;
        if (supportsPressRipple) {
            ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
            });
            if (this.adapter_.isUnbounded()) {
                this.adapter_.registerResizeHandler(this.resizeHandler_);
            }
        }
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
    };
    MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
        var _this = this;
        if (evt.type === 'keydown') {
            this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        }
        else {
            POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
            });
        }
    };
    MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
        var _this = this;
        ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
        if (this.adapter_.isUnbounded()) {
            this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
    };
    MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
        var _this = this;
        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
            _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
        });
    };
    MDCRippleFoundation.prototype.removeCssVars_ = function () {
        var _this = this;
        var rippleStrings = MDCRippleFoundation.strings;
        var keys = Object.keys(rippleStrings);
        keys.forEach(function (key) {
            if (key.indexOf('VAR_') === 0) {
                _this.adapter_.updateCssVariable(rippleStrings[key], null);
            }
        });
    };
    MDCRippleFoundation.prototype.activate_ = function (evt) {
        var _this = this;
        if (this.adapter_.isSurfaceDisabled()) {
            return;
        }
        var activationState = this.activationState_;
        if (activationState.isActivated) {
            return;
        }
        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
        if (isSameInteraction) {
            return;
        }
        activationState.isActivated = true;
        activationState.isProgrammatic = evt === undefined;
        activationState.activationEvent = evt;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
        var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) { return _this.adapter_.containsEventTarget(target); });
        if (hasActivatedChild) {
            // Immediately reset activation state, while preserving logic that prevents touch follow-on events
            this.resetActivationState_();
            return;
        }
        if (evt !== undefined) {
            activatedTargets.push(evt.target);
            this.registerDeactivationHandlers_(evt);
        }
        activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
        if (activationState.wasElementMadeActive) {
            this.animateActivation_();
        }
        requestAnimationFrame(function () {
            // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
            activatedTargets = [];
            if (!activationState.wasElementMadeActive
                && evt !== undefined
                && (evt.key === ' ' || evt.keyCode === 32)) {
                // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                // active states inconsistently when they're called within event handling code:
                // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                // variable is set within a rAF callback for a submit button interaction (#2241).
                activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                if (activationState.wasElementMadeActive) {
                    _this.animateActivation_();
                }
            }
            if (!activationState.wasElementMadeActive) {
                // Reset activation state immediately if element was not made active.
                _this.activationState_ = _this.defaultActivationState_();
            }
        });
    };
    MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
        return (evt !== undefined && evt.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
    };
    MDCRippleFoundation.prototype.animateActivation_ = function () {
        var _this = this;
        var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
        var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
        this.layoutInternal_();
        var translateStart = '';
        var translateEnd = '';
        if (!this.adapter_.isUnbounded()) {
            var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
            translateStart = startPoint.x + "px, " + startPoint.y + "px";
            translateEnd = endPoint.x + "px, " + endPoint.y + "px";
        }
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);
        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
        var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
        var startPoint;
        if (wasActivatedByPointer) {
            startPoint = Object(_util__WEBPACK_IMPORTED_MODULE_3__["getNormalizedEventCoords"])(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        }
        else {
            startPoint = {
                x: this.frame_.width / 2,
                y: this.frame_.height / 2,
            };
        }
        // Center the element around the start point.
        startPoint = {
            x: startPoint.x - (this.initialSize_ / 2),
            y: startPoint.y - (this.initialSize_ / 2),
        };
        var endPoint = {
            x: (this.frame_.width / 2) - (this.initialSize_ / 2),
            y: (this.frame_.height / 2) - (this.initialSize_ / 2),
        };
        return { startPoint: startPoint, endPoint: endPoint };
    };
    MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
        var _this = this;
        // This method is called both when a pointing device is released, and when the activation animation ends.
        // The deactivation animation should only run after both of those occur.
        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
        var activationHasEnded = hasDeactivationUXRun || !isActivated;
        if (activationHasEnded && this.activationAnimationHasEnded_) {
            this.rmBoundedActivationClasses_();
            this.adapter_.addClass(FG_DEACTIVATION);
            this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                _this.adapter_.removeClass(FG_DEACTIVATION);
            }, _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"].FG_DEACTIVATION_MS);
        }
    };
    MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
    };
    MDCRippleFoundation.prototype.resetActivationState_ = function () {
        var _this = this;
        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation.prototype.deactivate_ = function () {
        var _this = this;
        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
            return;
        }
        var state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, activationState);
        if (activationState.isProgrammatic) {
            requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
            this.resetActivationState_();
        }
        else {
            this.deregisterDeactivationHandlers_();
            requestAnimationFrame(function () {
                _this.activationState_.hasDeactivationUXRun = true;
                _this.animateDeactivation_(state);
                _this.resetActivationState_();
            });
        }
    };
    MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
        var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
        if (wasActivatedByPointer || wasElementMadeActive) {
            this.runDeactivationUXLogicIfReady_();
        }
    };
    MDCRippleFoundation.prototype.layoutInternal_ = function () {
        var _this = this;
        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);
        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function () {
            var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
            return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };
        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();
        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
        this.updateLayoutCssVars_();
    };
    MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
        var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
        if (this.adapter_.isUnbounded()) {
            this.unboundedCoords_ = {
                left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
            };
            this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
            this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
        }
    };
    return MDCRippleFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCRippleFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/ripple/util.js":
/*!***********************************************!*\
  !*** ./node_modules/@material/ripple/util.js ***!
  \***********************************************/
/*! exports provided: supportsCssVariables, getNormalizedEventCoords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsCssVariables", function() { return supportsCssVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNormalizedEventCoords", function() { return getNormalizedEventCoords; });
/**
 * Stores result from supportsCssVariables to avoid redundant processing to
 * detect CSS custom variable support.
 */
var supportsCssVariables_;
function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);
    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
    return hasPseudoVarBug;
}
function supportsCssVariables(windowObj, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    var CSS = windowObj.CSS;
    var supportsCssVars = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
        return supportsCssVariables_;
    }
    var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
    if (!supportsFunctionPresent) {
        return false;
    }
    var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
        CSS.supports('color', '#00000000'));
    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
        supportsCssVars = !detectEdgePseudoVarBug(windowObj);
    }
    else {
        supportsCssVars = false;
    }
    if (!forceRefresh) {
        supportsCssVariables_ = supportsCssVars;
    }
    return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
    if (!evt) {
        return { x: 0, y: 0 };
    }
    var x = pageOffset.x, y = pageOffset.y;
    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;
    var normalizedX;
    var normalizedY;
    // Determine touch point relative to the ripple container.
    if (evt.type === 'touchstart') {
        var touchEvent = evt;
        normalizedX = touchEvent.changedTouches[0].pageX - documentX;
        normalizedY = touchEvent.changedTouches[0].pageY - documentY;
    }
    else {
        var mouseEvent = evt;
        normalizedX = mouseEvent.pageX - documentX;
        normalizedY = mouseEvent.pageY - documentY;
    }
    return { x: normalizedX, y: normalizedY };
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/component.js":
/*!*********************************************************!*\
  !*** ./node_modules/@material/top-app-bar/component.js ***!
  \*********************************************************/
/*! exports provided: MDCTopAppBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBar", function() { return MDCTopAppBar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/component */ "./node_modules/@material/base/component.js");
/* harmony import */ var _material_ripple_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material/ripple/component */ "./node_modules/@material/ripple/component.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _fixed_foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fixed/foundation */ "./node_modules/@material/top-app-bar/fixed/foundation.js");
/* harmony import */ var _short_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./short/foundation */ "./node_modules/@material/top-app-bar/short/foundation.js");
/* harmony import */ var _standard_foundation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./standard/foundation */ "./node_modules/@material/top-app-bar/standard/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */







var MDCTopAppBar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCTopAppBar, _super);
    function MDCTopAppBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTopAppBar.attachTo = function (root) {
        return new MDCTopAppBar(root);
    };
    MDCTopAppBar.prototype.initialize = function (rippleFactory) {
        if (rippleFactory === void 0) { rippleFactory = function (el) { return _material_ripple_component__WEBPACK_IMPORTED_MODULE_2__["MDCRipple"].attachTo(el); }; }
        this.navIcon_ = this.root_.querySelector(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].NAVIGATION_ICON_SELECTOR);
        // Get all icons in the toolbar and instantiate the ripples
        var icons = [].slice.call(this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_ITEM_SELECTOR));
        if (this.navIcon_) {
            icons.push(this.navIcon_);
        }
        this.iconRipples_ = icons.map(function (icon) {
            var ripple = rippleFactory(icon);
            ripple.unbounded = true;
            return ripple;
        });
        this.scrollTarget_ = window;
    };
    MDCTopAppBar.prototype.initialSyncWithDOM = function () {
        this.handleNavigationClick_ = this.foundation_.handleNavigationClick.bind(this.foundation_);
        this.handleWindowResize_ = this.foundation_.handleWindowResize.bind(this.foundation_);
        this.handleTargetScroll_ = this.foundation_.handleTargetScroll.bind(this.foundation_);
        this.scrollTarget_.addEventListener('scroll', this.handleTargetScroll_);
        if (this.navIcon_) {
            this.navIcon_.addEventListener('click', this.handleNavigationClick_);
        }
        var isFixed = this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].FIXED_CLASS);
        var isShort = this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].SHORT_CLASS);
        if (!isShort && !isFixed) {
            window.addEventListener('resize', this.handleWindowResize_);
        }
    };
    MDCTopAppBar.prototype.destroy = function () {
        this.iconRipples_.forEach(function (iconRipple) { return iconRipple.destroy(); });
        this.scrollTarget_.removeEventListener('scroll', this.handleTargetScroll_);
        if (this.navIcon_) {
            this.navIcon_.removeEventListener('click', this.handleNavigationClick_);
        }
        var isFixed = this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].FIXED_CLASS);
        var isShort = this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].SHORT_CLASS);
        if (!isShort && !isFixed) {
            window.removeEventListener('resize', this.handleWindowResize_);
        }
        _super.prototype.destroy.call(this);
    };
    MDCTopAppBar.prototype.setScrollTarget = function (target) {
        // Remove scroll handler from the previous scroll target
        this.scrollTarget_.removeEventListener('scroll', this.handleTargetScroll_);
        this.scrollTarget_ = target;
        // Initialize scroll handler on the new scroll target
        this.handleTargetScroll_ =
            this.foundation_.handleTargetScroll.bind(this.foundation_);
        this.scrollTarget_.addEventListener('scroll', this.handleTargetScroll_);
    };
    MDCTopAppBar.prototype.getDefaultFoundation = function () {
        var _this = this;
        // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
        // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
        // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
        var adapter = {
            hasClass: function (className) { return _this.root_.classList.contains(className); },
            addClass: function (className) { return _this.root_.classList.add(className); },
            removeClass: function (className) { return _this.root_.classList.remove(className); },
            setStyle: function (property, value) { return _this.root_.style.setProperty(property, value); },
            getTopAppBarHeight: function () { return _this.root_.clientHeight; },
            notifyNavigationIconClicked: function () { return _this.emit(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].NAVIGATION_EVENT, {}); },
            getViewportScrollY: function () {
                var win = _this.scrollTarget_;
                var el = _this.scrollTarget_;
                return win.pageYOffset !== undefined ? win.pageYOffset : el.scrollTop;
            },
            getTotalActionItems: function () { return _this.root_.querySelectorAll(_constants__WEBPACK_IMPORTED_MODULE_3__["strings"].ACTION_ITEM_SELECTOR).length; },
        };
        // tslint:enable:object-literal-sort-keys
        var foundation;
        if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].SHORT_CLASS)) {
            foundation = new _short_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCShortTopAppBarFoundation"](adapter);
        }
        else if (this.root_.classList.contains(_constants__WEBPACK_IMPORTED_MODULE_3__["cssClasses"].FIXED_CLASS)) {
            foundation = new _fixed_foundation__WEBPACK_IMPORTED_MODULE_4__["MDCFixedTopAppBarFoundation"](adapter);
        }
        else {
            foundation = new _standard_foundation__WEBPACK_IMPORTED_MODULE_6__["MDCTopAppBarFoundation"](adapter);
        }
        return foundation;
    };
    return MDCTopAppBar;
}(_material_base_component__WEBPACK_IMPORTED_MODULE_1__["MDCComponent"]));

//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/@material/top-app-bar/constants.js ***!
  \*********************************************************/
/*! exports provided: cssClasses, numbers, strings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return strings; });
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    FIXED_CLASS: 'mdc-top-app-bar--fixed',
    FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
    SHORT_CLASS: 'mdc-top-app-bar--short',
    SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
    SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
};
var numbers = {
    DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
    MAX_TOP_APP_BAR_HEIGHT: 128,
};
var strings = {
    ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
    NAVIGATION_EVENT: 'MDCTopAppBar:nav',
    NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
    ROOT_SELECTOR: '.mdc-top-app-bar',
    TITLE_SELECTOR: '.mdc-top-app-bar__title',
};

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/fixed/foundation.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material/top-app-bar/fixed/foundation.js ***!
  \****************************************************************/
/*! exports provided: MDCFixedTopAppBarFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCFixedTopAppBarFoundation", function() { return MDCFixedTopAppBarFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _standard_foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../standard/foundation */ "./node_modules/@material/top-app-bar/standard/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var MDCFixedTopAppBarFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCFixedTopAppBarFoundation, _super);
    function MDCFixedTopAppBarFoundation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * State variable for the previous scroll iteration top app bar state
         */
        _this.wasScrolled_ = false;
        return _this;
    }
    /**
     * Scroll handler for applying/removing the modifier class on the fixed top app bar.
     * @override
     */
    MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
        var currentScroll = this.adapter_.getViewportScrollY();
        if (currentScroll <= 0) {
            if (this.wasScrolled_) {
                this.adapter_.removeClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].FIXED_SCROLLED_CLASS);
                this.wasScrolled_ = false;
            }
        }
        else {
            if (!this.wasScrolled_) {
                this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].FIXED_SCROLLED_CLASS);
                this.wasScrolled_ = true;
            }
        }
    };
    return MDCFixedTopAppBarFoundation;
}(_standard_foundation__WEBPACK_IMPORTED_MODULE_2__["MDCTopAppBarFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCFixedTopAppBarFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/foundation.js":
/*!**********************************************************!*\
  !*** ./node_modules/@material/top-app-bar/foundation.js ***!
  \**********************************************************/
/*! exports provided: MDCTopAppBarBaseFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarBaseFoundation", function() { return MDCTopAppBarBaseFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _material_base_foundation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/base/foundation */ "./node_modules/@material/base/foundation.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/top-app-bar/constants.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var MDCTopAppBarBaseFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCTopAppBarBaseFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCTopAppBarBaseFoundation(adapter) {
        return _super.call(this, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, MDCTopAppBarBaseFoundation.defaultAdapter, adapter)) || this;
    }
    Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["strings"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["cssClasses"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
        get: function () {
            return _constants__WEBPACK_IMPORTED_MODULE_2__["numbers"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                setStyle: function () { return undefined; },
                getTopAppBarHeight: function () { return 0; },
                notifyNavigationIconClicked: function () { return undefined; },
                getViewportScrollY: function () { return 0; },
                getTotalActionItems: function () { return 0; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: true,
        configurable: true
    });
    /** Other variants of TopAppBar foundation overrides this method */
    MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () { }; // tslint:disable-line:no-empty
    /** Other variants of TopAppBar foundation overrides this method */
    MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () { }; // tslint:disable-line:no-empty
    MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
        this.adapter_.notifyNavigationIconClicked();
    };
    return MDCTopAppBarBaseFoundation;
}(_material_base_foundation__WEBPACK_IMPORTED_MODULE_1__["MDCFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarBaseFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@material/top-app-bar/index.js ***!
  \*****************************************************/
/*! exports provided: MDCTopAppBar, cssClasses, numbers, strings, MDCTopAppBarBaseFoundation, MDCFixedTopAppBarFoundation, MDCShortTopAppBarFoundation, MDCTopAppBarFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./node_modules/@material/top-app-bar/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBar", function() { return _component__WEBPACK_IMPORTED_MODULE_0__["MDCTopAppBar"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cssClasses", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["numbers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strings", function() { return _constants__WEBPACK_IMPORTED_MODULE_1__["strings"]; });

/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarBaseFoundation", function() { return _foundation__WEBPACK_IMPORTED_MODULE_2__["MDCTopAppBarBaseFoundation"]; });

/* harmony import */ var _fixed_foundation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fixed/foundation */ "./node_modules/@material/top-app-bar/fixed/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCFixedTopAppBarFoundation", function() { return _fixed_foundation__WEBPACK_IMPORTED_MODULE_3__["MDCFixedTopAppBarFoundation"]; });

/* harmony import */ var _short_foundation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./short/foundation */ "./node_modules/@material/top-app-bar/short/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCShortTopAppBarFoundation", function() { return _short_foundation__WEBPACK_IMPORTED_MODULE_4__["MDCShortTopAppBarFoundation"]; });

/* harmony import */ var _standard_foundation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./standard/foundation */ "./node_modules/@material/top-app-bar/standard/foundation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarFoundation", function() { return _standard_foundation__WEBPACK_IMPORTED_MODULE_5__["MDCTopAppBarFoundation"]; });

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/short/foundation.js":
/*!****************************************************************!*\
  !*** ./node_modules/@material/top-app-bar/short/foundation.js ***!
  \****************************************************************/
/*! exports provided: MDCShortTopAppBarFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCShortTopAppBarFoundation", function() { return MDCShortTopAppBarFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var MDCShortTopAppBarFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCShortTopAppBarFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCShortTopAppBarFoundation(adapter) {
        var _this = _super.call(this, adapter) || this;
        _this.isCollapsed_ = false;
        return _this;
    }
    Object.defineProperty(MDCShortTopAppBarFoundation.prototype, "isCollapsed", {
        // Public visibility for backward compatibility.
        get: function () {
            return this.isCollapsed_;
        },
        enumerable: true,
        configurable: true
    });
    MDCShortTopAppBarFoundation.prototype.init = function () {
        _super.prototype.init.call(this);
        if (this.adapter_.getTotalActionItems() > 0) {
            this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].SHORT_HAS_ACTION_ITEM_CLASS);
        }
        // this is intended as the short variant must calculate if the
        // page starts off from the top of the page.
        this.handleTargetScroll();
    };
    /**
     * Scroll handler for applying/removing the collapsed modifier class on the short top app bar.
     * @override
     */
    MDCShortTopAppBarFoundation.prototype.handleTargetScroll = function () {
        if (this.adapter_.hasClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].SHORT_COLLAPSED_CLASS)) {
            return;
        }
        var currentScroll = this.adapter_.getViewportScrollY();
        if (currentScroll <= 0) {
            if (this.isCollapsed_) {
                this.adapter_.removeClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].SHORT_COLLAPSED_CLASS);
                this.isCollapsed_ = false;
            }
        }
        else {
            if (!this.isCollapsed_) {
                this.adapter_.addClass(_constants__WEBPACK_IMPORTED_MODULE_1__["cssClasses"].SHORT_COLLAPSED_CLASS);
                this.isCollapsed_ = true;
            }
        }
    };
    return MDCShortTopAppBarFoundation;
}(_foundation__WEBPACK_IMPORTED_MODULE_2__["MDCTopAppBarBaseFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCShortTopAppBarFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/@material/top-app-bar/standard/foundation.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@material/top-app-bar/standard/foundation.js ***!
  \*******************************************************************/
/*! exports provided: MDCTopAppBarFoundation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCTopAppBarFoundation", function() { return MDCTopAppBarFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/@material/top-app-bar/constants.js");
/* harmony import */ var _foundation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../foundation */ "./node_modules/@material/top-app-bar/foundation.js");
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



var INITIAL_VALUE = 0;
var MDCTopAppBarFoundation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MDCTopAppBarFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCTopAppBarFoundation(adapter) {
        var _this = _super.call(this, adapter) || this;
        /**
         * Indicates if the top app bar was docked in the previous scroll handler iteration.
         */
        _this.wasDocked_ = true;
        /**
         * Indicates if the top app bar is docked in the fully shown position.
         */
        _this.isDockedShowing_ = true;
        /**
         * Variable for current scroll position of the top app bar
         */
        _this.currentAppBarOffsetTop_ = 0;
        /**
         * Used to prevent the top app bar from being scrolled out of view during resize events
         */
        _this.isCurrentlyBeingResized_ = false;
        /**
         * The timeout that's used to throttle the resize events
         */
        _this.resizeThrottleId_ = INITIAL_VALUE;
        /**
         * The timeout that's used to debounce toggling the isCurrentlyBeingResized_ variable after a resize
         */
        _this.resizeDebounceId_ = INITIAL_VALUE;
        _this.lastScrollPosition_ = _this.adapter_.getViewportScrollY();
        _this.topAppBarHeight_ = _this.adapter_.getTopAppBarHeight();
        return _this;
    }
    MDCTopAppBarFoundation.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.adapter_.setStyle('top', '');
    };
    /**
     * Scroll handler for the default scroll behavior of the top app bar.
     * @override
     */
    MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
        var currentScrollPosition = Math.max(this.adapter_.getViewportScrollY(), 0);
        var diff = currentScrollPosition - this.lastScrollPosition_;
        this.lastScrollPosition_ = currentScrollPosition;
        // If the window is being resized the lastScrollPosition_ needs to be updated but the
        // current scroll of the top app bar should stay in the same position.
        if (!this.isCurrentlyBeingResized_) {
            this.currentAppBarOffsetTop_ -= diff;
            if (this.currentAppBarOffsetTop_ > 0) {
                this.currentAppBarOffsetTop_ = 0;
            }
            else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
                this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
            }
            this.moveTopAppBar_();
        }
    };
    /**
     * Top app bar resize handler that throttle/debounce functions that execute updates.
     * @override
     */
    MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
        var _this = this;
        // Throttle resize events 10 p/s
        if (!this.resizeThrottleId_) {
            this.resizeThrottleId_ = setTimeout(function () {
                _this.resizeThrottleId_ = INITIAL_VALUE;
                _this.throttledResizeHandler_();
            }, _constants__WEBPACK_IMPORTED_MODULE_1__["numbers"].DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
        }
        this.isCurrentlyBeingResized_ = true;
        if (this.resizeDebounceId_) {
            clearTimeout(this.resizeDebounceId_);
        }
        this.resizeDebounceId_ = setTimeout(function () {
            _this.handleTargetScroll();
            _this.isCurrentlyBeingResized_ = false;
            _this.resizeDebounceId_ = INITIAL_VALUE;
        }, _constants__WEBPACK_IMPORTED_MODULE_1__["numbers"].DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    };
    /**
     * Function to determine if the DOM needs to update.
     */
    MDCTopAppBarFoundation.prototype.checkForUpdate_ = function () {
        var offscreenBoundaryTop = -this.topAppBarHeight_;
        var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
        var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
        var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
        // If it's partially showing, it can't be docked.
        if (partiallyShowing) {
            this.wasDocked_ = false;
        }
        else {
            // Not previously docked and not partially showing, it's now docked.
            if (!this.wasDocked_) {
                this.wasDocked_ = true;
                return true;
            }
            else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
                this.isDockedShowing_ = hasAnyPixelsOnscreen;
                return true;
            }
        }
        return partiallyShowing;
    };
    /**
     * Function to move the top app bar if needed.
     */
    MDCTopAppBarFoundation.prototype.moveTopAppBar_ = function () {
        if (this.checkForUpdate_()) {
            // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
            // so the top app bar doesn't show if the window resizes and the new height > the old height.
            var offset = this.currentAppBarOffsetTop_;
            if (Math.abs(offset) >= this.topAppBarHeight_) {
                offset = -_constants__WEBPACK_IMPORTED_MODULE_1__["numbers"].MAX_TOP_APP_BAR_HEIGHT;
            }
            this.adapter_.setStyle('top', offset + 'px');
        }
    };
    /**
     * Throttled function that updates the top app bar scrolled values if the
     * top app bar height changes.
     */
    MDCTopAppBarFoundation.prototype.throttledResizeHandler_ = function () {
        var currentHeight = this.adapter_.getTopAppBarHeight();
        if (this.topAppBarHeight_ !== currentHeight) {
            this.wasDocked_ = false;
            // Since the top app bar has a different height depending on the screen width, this
            // will ensure that the top app bar remains in the correct location if
            // completely hidden and a resize makes the top app bar a different height.
            this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
            this.topAppBarHeight_ = currentHeight;
        }
        this.handleTargetScroll();
    };
    return MDCTopAppBarFoundation;
}(_foundation__WEBPACK_IMPORTED_MODULE_2__["MDCTopAppBarBaseFoundation"]));

// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
/* harmony default export */ __webpack_exports__["default"] = (MDCTopAppBarFoundation);
//# sourceMappingURL=foundation.js.map

/***/ }),

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./src/scss/main.scss":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/sass-loader/dist/cjs.js??ref--7-2!./src/scss/main.scss ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".mdc-top-app-bar {\n  background-color: #0473b8;\n  /* @alternate */\n  background-color: var(--mdc-theme-primary, #0473b8);\n  color: white;\n  display: flex;\n  position: fixed;\n  flex-direction: column;\n  justify-content: space-between;\n  box-sizing: border-box;\n  width: 100%;\n  z-index: 4; }\n  .mdc-top-app-bar .mdc-top-app-bar__action-item,\n  .mdc-top-app-bar .mdc-top-app-bar__navigation-icon {\n    color: #fff;\n    /* @alternate */\n    color: var(--mdc-theme-on-primary, #fff); }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item::before, .mdc-top-app-bar .mdc-top-app-bar__action-item::after,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after {\n      background-color: #fff; }\n      @supports not (-ms-ime-align: auto) {\n        .mdc-top-app-bar .mdc-top-app-bar__action-item::before, .mdc-top-app-bar .mdc-top-app-bar__action-item::after,\n        .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,\n        .mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after {\n          /* @alternate */\n          background-color: var(--mdc-theme-on-primary, #fff); } }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before {\n      opacity: 0.08; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before, .mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before {\n      transition-duration: 75ms;\n      opacity: 0.24; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after {\n      transition: opacity 150ms linear; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after {\n      transition-duration: 75ms;\n      opacity: 0.24; }\n    .mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,\n    .mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded {\n      --mdc-ripple-fg-opacity: 0.24; }\n  .mdc-top-app-bar__row {\n    display: flex;\n    position: relative;\n    box-sizing: border-box;\n    width: 100%;\n    height: 64px; }\n  .mdc-top-app-bar__section {\n    display: inline-flex;\n    flex: 1 1 auto;\n    align-items: center;\n    min-width: 0;\n    padding: 8px 12px;\n    z-index: 1; }\n    .mdc-top-app-bar__section--align-start {\n      justify-content: flex-start;\n      order: -1; }\n    .mdc-top-app-bar__section--align-end {\n      justify-content: flex-end;\n      order: 1; }\n  .mdc-top-app-bar__title {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 1.25rem;\n    line-height: 2rem;\n    font-weight: 500;\n    letter-spacing: 0.0125em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    /* @noflip */\n    padding-left: 20px;\n    /* @noflip */\n    padding-right: 0;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    z-index: 1; }\n    [dir=\"rtl\"] .mdc-top-app-bar__title, .mdc-top-app-bar__title[dir=\"rtl\"] {\n      /* @noflip */\n      padding-left: 0;\n      /* @noflip */\n      padding-right: 20px; }\n\n.mdc-top-app-bar--short-collapsed {\n  /* @noflip */\n  border-radius: 0 0 24px 0; }\n  [dir=\"rtl\"] .mdc-top-app-bar--short-collapsed, .mdc-top-app-bar--short-collapsed[dir=\"rtl\"] {\n    /* @noflip */\n    border-radius: 0 0 0 24px; }\n\n.mdc-top-app-bar--short {\n  top: 0;\n  /* @noflip */\n  right: auto;\n  /* @noflip */\n  left: 0;\n  width: 100%;\n  transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1); }\n  [dir=\"rtl\"] .mdc-top-app-bar--short, .mdc-top-app-bar--short[dir=\"rtl\"] {\n    /* @noflip */\n    right: 0;\n    /* @noflip */\n    left: auto; }\n  .mdc-top-app-bar--short .mdc-top-app-bar__row {\n    height: 56px; }\n  .mdc-top-app-bar--short .mdc-top-app-bar__section {\n    padding: 4px; }\n  .mdc-top-app-bar--short .mdc-top-app-bar__title {\n    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);\n    opacity: 1; }\n\n.mdc-top-app-bar--short-collapsed {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  width: 56px;\n  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title {\n    display: none; }\n  .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item {\n    transition: padding 150ms cubic-bezier(0.4, 0, 0.2, 1); }\n\n.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item {\n  width: 112px; }\n  .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 12px; }\n    [dir=\"rtl\"] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end, .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=\"rtl\"] {\n      /* @noflip */\n      padding-left: 12px;\n      /* @noflip */\n      padding-right: 0; }\n\n.mdc-top-app-bar--dense .mdc-top-app-bar__row {\n  height: 48px; }\n\n.mdc-top-app-bar--dense .mdc-top-app-bar__section {\n  padding: 0 4px; }\n\n.mdc-top-app-bar--dense .mdc-top-app-bar__title {\n  /* @noflip */\n  padding-left: 12px;\n  /* @noflip */\n  padding-right: 0; }\n  [dir=\"rtl\"] .mdc-top-app-bar--dense .mdc-top-app-bar__title, .mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=\"rtl\"] {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 12px; }\n\n.mdc-top-app-bar--prominent .mdc-top-app-bar__row {\n  height: 128px; }\n\n.mdc-top-app-bar--prominent .mdc-top-app-bar__title {\n  align-self: flex-end;\n  padding-bottom: 2px; }\n\n.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,\n.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon {\n  align-self: flex-start; }\n\n.mdc-top-app-bar--fixed {\n  transition: box-shadow 200ms linear; }\n\n.mdc-top-app-bar--fixed-scrolled {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 200ms linear; }\n\n.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row {\n  height: 96px; }\n\n.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section {\n  padding: 0 12px; }\n\n.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title {\n  /* @noflip */\n  padding-left: 20px;\n  /* @noflip */\n  padding-right: 0;\n  padding-bottom: 9px; }\n  [dir=\"rtl\"] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title, .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=\"rtl\"] {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 20px; }\n\n.mdc-top-app-bar--fixed-adjust {\n  padding-top: 64px; }\n\n.mdc-top-app-bar--dense-fixed-adjust {\n  padding-top: 48px; }\n\n.mdc-top-app-bar--short-fixed-adjust {\n  padding-top: 56px; }\n\n.mdc-top-app-bar--prominent-fixed-adjust {\n  padding-top: 128px; }\n\n.mdc-top-app-bar--dense-prominent-fixed-adjust {\n  padding-top: 96px; }\n\n@media (max-width: 599px) {\n  .mdc-top-app-bar__row {\n    height: 56px; }\n  .mdc-top-app-bar__section {\n    padding: 4px; }\n  .mdc-top-app-bar--short {\n    transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-top-app-bar--short-collapsed {\n    transition: width 250ms cubic-bezier(0.4, 0, 0.2, 1); }\n    .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end {\n      /* @noflip */\n      padding-left: 0;\n      /* @noflip */\n      padding-right: 12px; }\n      [dir=\"rtl\"] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end, .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=\"rtl\"] {\n        /* @noflip */\n        padding-left: 12px;\n        /* @noflip */\n        padding-right: 0; }\n  .mdc-top-app-bar--prominent .mdc-top-app-bar__title {\n    padding-bottom: 6px; }\n  .mdc-top-app-bar--fixed-adjust {\n    padding-top: 56px; } }\n\n.mdc-icon-button {\n  width: 48px;\n  height: 48px;\n  padding: 12px;\n  font-size: 24px;\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  border: none;\n  outline: none;\n  background-color: transparent;\n  fill: currentColor;\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  user-select: none; }\n  .mdc-icon-button svg,\n  .mdc-icon-button img {\n    width: 24px;\n    height: 24px; }\n  .mdc-icon-button:disabled {\n    color: rgba(0, 0, 0, 0.38);\n    /* @alternate */\n    color: var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));\n    cursor: default;\n    pointer-events: none; }\n\n.mdc-icon-button__icon {\n  display: inline-block; }\n  .mdc-icon-button__icon.mdc-icon-button__icon--on {\n    display: none; }\n\n.mdc-icon-button--on .mdc-icon-button__icon {\n  display: none; }\n  .mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on {\n    display: inline-block; }\n\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-icon-button {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n  .mdc-icon-button::before, .mdc-icon-button::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-icon-button::before {\n    transition: opacity 15ms linear, background-color 15ms linear;\n    z-index: 1; }\n  .mdc-icon-button.mdc-ripple-upgraded::before {\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-icon-button.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-icon-button.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  .mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after {\n    animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards; }\n  .mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after {\n    animation: mdc-ripple-fg-opacity-out 150ms;\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-icon-button::before, .mdc-icon-button::after {\n    top: calc(50% - 50%);\n    /* @noflip */\n    left: calc(50% - 50%);\n    width: 100%;\n    height: 100%; }\n  .mdc-icon-button.mdc-ripple-upgraded::before, .mdc-icon-button.mdc-ripple-upgraded::after {\n    top: var(--mdc-ripple-top, calc(50% - 50%));\n    /* @noflip */\n    left: var(--mdc-ripple-left, calc(50% - 50%));\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-icon-button.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-icon-button::before, .mdc-icon-button::after {\n    background-color: #000; }\n  .mdc-icon-button:hover::before {\n    opacity: 0.04; }\n  .mdc-icon-button:not(.mdc-ripple-upgraded):focus::before, .mdc-icon-button.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .mdc-icon-button:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-icon-button:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .mdc-icon-button.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.12; }\n\n.mdc-drawer {\n  border-color: rgba(0, 0, 0, 0.12);\n  background-color: #fff;\n  /* @noflip */\n  border-radius: 0 0 0 0;\n  z-index: 6;\n  width: 256px;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  box-sizing: border-box;\n  height: 100%;\n  /* @noflip */\n  border-right-width: 1px;\n  /* @noflip */\n  border-right-style: solid;\n  overflow: hidden;\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-drawer .mdc-drawer__title {\n    color: rgba(0, 0, 0, 0.87); }\n  .mdc-drawer .mdc-list-group__subheader {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-drawer .mdc-drawer__subtitle {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-drawer .mdc-list-item__graphic {\n    color: rgba(0, 0, 0, 0.6); }\n  .mdc-drawer .mdc-list-item {\n    color: rgba(0, 0, 0, 0.87); }\n  .mdc-drawer .mdc-list-item--activated .mdc-list-item__graphic {\n    color: #0473b8; }\n  .mdc-drawer .mdc-list-item--activated {\n    color: rgba(4, 115, 184, 0.87); }\n  [dir=\"rtl\"] .mdc-drawer, .mdc-drawer[dir=\"rtl\"] {\n    /* @noflip */\n    border-radius: 0 0 0 0; }\n  .mdc-drawer .mdc-list-item {\n    border-radius: 4px; }\n  .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing) + .mdc-drawer-app-content {\n    /* @noflip */\n    margin-left: 256px;\n    /* @noflip */\n    margin-right: 0; }\n    [dir=\"rtl\"] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing) + .mdc-drawer-app-content, .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing) + .mdc-drawer-app-content[dir=\"rtl\"] {\n      /* @noflip */\n      margin-left: 0;\n      /* @noflip */\n      margin-right: 256px; }\n  [dir=\"rtl\"] .mdc-drawer, .mdc-drawer[dir=\"rtl\"] {\n    /* @noflip */\n    border-right-width: 0;\n    /* @noflip */\n    border-left-width: 1px;\n    /* @noflip */\n    border-right-style: none;\n    /* @noflip */\n    border-left-style: solid; }\n  .mdc-drawer .mdc-list-item {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    line-height: 1.375rem;\n    font-weight: 500;\n    letter-spacing: 0.00714em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    height: calc(48px - 2 * 4px);\n    margin: 8px 8px;\n    padding: 0 8px; }\n  .mdc-drawer .mdc-list-item:nth-child(1) {\n    margin-top: 2px; }\n  .mdc-drawer .mdc-list-item:nth-last-child(1) {\n    margin-bottom: 0; }\n  .mdc-drawer .mdc-list-group__subheader {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n    font-weight: 400;\n    letter-spacing: 0.01786em;\n    text-decoration: inherit;\n    text-transform: inherit;\n    display: block;\n    margin-top: 0;\n    /* @alternate */\n    line-height: normal;\n    margin: 0;\n    padding: 0 16px; }\n    .mdc-drawer .mdc-list-group__subheader::before {\n      display: inline-block;\n      width: 0;\n      height: 24px;\n      content: \"\";\n      vertical-align: 0; }\n  .mdc-drawer .mdc-list-divider {\n    margin: 3px 0 4px 0; }\n  .mdc-drawer .mdc-list-item__text,\n  .mdc-drawer .mdc-list-item__graphic {\n    pointer-events: none; }\n\n.mdc-drawer--animate {\n  transform: translateX(-100%); }\n  [dir=\"rtl\"] .mdc-drawer--animate, .mdc-drawer--animate[dir=\"rtl\"] {\n    transform: translateX(100%); }\n\n.mdc-drawer--opening {\n  transform: translateX(0);\n  transition-duration: 250ms; }\n  [dir=\"rtl\"] .mdc-drawer--opening, .mdc-drawer--opening[dir=\"rtl\"] {\n    transform: translateX(0); }\n\n.mdc-drawer--closing {\n  transform: translateX(-100%);\n  transition-duration: 200ms; }\n  [dir=\"rtl\"] .mdc-drawer--closing, .mdc-drawer--closing[dir=\"rtl\"] {\n    transform: translateX(100%); }\n\n.mdc-drawer__header {\n  flex-shrink: 0;\n  box-sizing: border-box;\n  min-height: 64px;\n  padding: 0 16px 4px; }\n\n.mdc-drawer__title {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.0125em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  display: block;\n  margin-top: 0;\n  /* @alternate */\n  line-height: normal;\n  margin-bottom: -20px; }\n  .mdc-drawer__title::before {\n    display: inline-block;\n    width: 0;\n    height: 36px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-drawer__title::after {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: -20px; }\n\n.mdc-drawer__subtitle {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  display: block;\n  margin-top: 0;\n  /* @alternate */\n  line-height: normal;\n  margin-bottom: 0; }\n  .mdc-drawer__subtitle::before {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: 0; }\n\n.mdc-drawer__content {\n  height: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n\n.mdc-drawer--dismissible {\n  /* @noflip */\n  left: 0;\n  /* @noflip */\n  right: initial;\n  display: none;\n  position: absolute; }\n  [dir=\"rtl\"] .mdc-drawer--dismissible, .mdc-drawer--dismissible[dir=\"rtl\"] {\n    /* @noflip */\n    left: initial;\n    /* @noflip */\n    right: 0; }\n  .mdc-drawer--dismissible.mdc-drawer--open {\n    display: flex; }\n\n.mdc-drawer-app-content {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 0;\n  position: relative; }\n  [dir=\"rtl\"] .mdc-drawer-app-content, .mdc-drawer-app-content[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-drawer--modal {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);\n  /* @noflip */\n  left: 0;\n  /* @noflip */\n  right: initial;\n  display: none;\n  position: fixed; }\n  .mdc-drawer--modal + .mdc-drawer-scrim {\n    background-color: rgba(0, 0, 0, 0.32); }\n  [dir=\"rtl\"] .mdc-drawer--modal, .mdc-drawer--modal[dir=\"rtl\"] {\n    /* @noflip */\n    left: initial;\n    /* @noflip */\n    right: 0; }\n  .mdc-drawer--modal.mdc-drawer--open {\n    display: flex; }\n\n.mdc-drawer-scrim {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 5;\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-drawer--open + .mdc-drawer-scrim {\n    display: block; }\n  .mdc-drawer--animate + .mdc-drawer-scrim {\n    opacity: 0; }\n  .mdc-drawer--opening + .mdc-drawer-scrim {\n    transition-duration: 250ms;\n    opacity: 1; }\n  .mdc-drawer--closing + .mdc-drawer-scrim {\n    transition-duration: 200ms;\n    opacity: 0; }\n\n.mdc-list {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  /* @alternate */\n  line-height: 1.5rem;\n  margin: 0;\n  padding: 8px 0;\n  list-style-type: none;\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n  .mdc-list:focus {\n    outline: none; }\n\n.mdc-list-item__secondary-text {\n  color: rgba(0, 0, 0, 0.54);\n  /* @alternate */\n  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n\n.mdc-list-item__graphic {\n  background-color: transparent; }\n\n.mdc-list-item__graphic {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__meta {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-group__subheader {\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n\n.mdc-list--dense {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  font-size: .812rem; }\n\n.mdc-list-item {\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  height: 48px;\n  padding: 0 16px;\n  overflow: hidden; }\n  .mdc-list-item:focus {\n    outline: none; }\n\n.mdc-list-item--selected,\n.mdc-list-item--activated {\n  color: #0473b8;\n  /* @alternate */\n  color: var(--mdc-theme-primary, #0473b8); }\n  .mdc-list-item--selected .mdc-list-item__graphic,\n  .mdc-list-item--activated .mdc-list-item__graphic {\n    color: #0473b8;\n    /* @alternate */\n    color: var(--mdc-theme-primary, #0473b8); }\n\n.mdc-list-item--disabled {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 32px;\n  width: 24px;\n  height: 24px;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  fill: currentColor; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 32px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list .mdc-list-item__graphic {\n  display: inline-flex; }\n\n.mdc-list-item__meta {\n  /* @noflip */\n  margin-left: auto;\n  /* @noflip */\n  margin-right: 0; }\n  .mdc-list-item__meta:not(.material-icons) {\n    font-family: Roboto, sans-serif;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    font-size: 0.75rem;\n    line-height: 1.25rem;\n    font-weight: 400;\n    letter-spacing: 0.03333em;\n    text-decoration: inherit;\n    text-transform: inherit; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list-item__meta,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list-item__meta {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: auto; }\n\n.mdc-list-item__text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden; }\n\n.mdc-list-item__text[for] {\n  pointer-events: none; }\n\n.mdc-list-item__primary-text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: block;\n  margin-top: 0;\n  /* @alternate */\n  line-height: normal;\n  margin-bottom: -20px;\n  display: block; }\n  .mdc-list-item__primary-text::before {\n    display: inline-block;\n    width: 0;\n    height: 32px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list-item__primary-text::after {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: -20px; }\n  .mdc-list--dense .mdc-list-item__primary-text {\n    display: block;\n    margin-top: 0;\n    /* @alternate */\n    line-height: normal;\n    margin-bottom: -20px; }\n    .mdc-list--dense .mdc-list-item__primary-text::before {\n      display: inline-block;\n      width: 0;\n      height: 24px;\n      content: \"\";\n      vertical-align: 0; }\n    .mdc-list--dense .mdc-list-item__primary-text::after {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: -20px; }\n\n.mdc-list-item__secondary-text {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: block;\n  margin-top: 0;\n  /* @alternate */\n  line-height: normal;\n  display: block; }\n  .mdc-list-item__secondary-text::before {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list--dense .mdc-list-item__secondary-text {\n    display: block;\n    margin-top: 0;\n    /* @alternate */\n    line-height: normal;\n    font-size: inherit; }\n    .mdc-list--dense .mdc-list-item__secondary-text::before {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: 0; }\n\n.mdc-list--dense .mdc-list-item {\n  height: 40px; }\n\n.mdc-list--dense .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 36px;\n  width: 20px;\n  height: 20px; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--dense .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 36px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list--avatar-list .mdc-list-item {\n  height: 56px; }\n\n.mdc-list--avatar-list .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 16px;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--avatar-list .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 16px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list--two-line .mdc-list-item__text {\n  align-self: flex-start; }\n\n.mdc-list--two-line .mdc-list-item {\n  height: 72px; }\n\n.mdc-list--two-line.mdc-list--dense .mdc-list-item,\n.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 20px;\n  width: 36px;\n  height: 36px; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 20px;\n    /* @noflip */\n    margin-right: 0; }\n\n:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item {\n  cursor: pointer; }\n\na.mdc-list-item {\n  color: inherit;\n  text-decoration: none; }\n\n.mdc-list-divider {\n  height: 0;\n  margin: 0;\n  border: none;\n  border-bottom-width: 1px;\n  border-bottom-style: solid; }\n\n.mdc-list-divider {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n\n.mdc-list-divider--padded {\n  margin: 0 16px; }\n\n.mdc-list-divider--inset {\n  /* @noflip */\n  margin-left: 72px;\n  /* @noflip */\n  margin-right: 0;\n  width: calc(100% - 72px); }\n  .mdc-list-group[dir=\"rtl\"] .mdc-list-divider--inset,\n  [dir=\"rtl\"] .mdc-list-group .mdc-list-divider--inset {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 72px; }\n\n.mdc-list-divider--inset.mdc-list-divider--padded {\n  width: calc(100% - 72px - 16px); }\n\n.mdc-list-group .mdc-list {\n  padding: 0; }\n\n.mdc-list-group__subheader {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin: 0.75rem 16px; }\n\n:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before {\n    transition: opacity 15ms linear, background-color 15ms linear;\n    z-index: 1; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::before {\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    transform: scale(0);\n    transform-origin: center center; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {\n    animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {\n    animation: mdc-ripple-fg-opacity-out 150ms;\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    background-color: #000; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:hover::before {\n    opacity: 0.04; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before {\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n    background-color: #0473b8; }\n    @supports not (-ms-ime-align: auto) {\n      :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #0473b8); } }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {\n    opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before {\n    opacity: 0.08; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n    background-color: #0473b8; }\n    @supports not (-ms-ime-align: auto) {\n      :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #0473b8); } }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.2; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.2; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.2; }\n\n:not(.mdc-list--non-interactive) > .mdc-list-item--disabled {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before {\n    transition: opacity 15ms linear, background-color 15ms linear;\n    z-index: 1; }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded::before {\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    transform: scale(0);\n    transform-origin: center center; }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation::after {\n    animation: mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards; }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation::after {\n    animation: mdc-ripple-fg-opacity-out 150ms;\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled::after {\n    background-color: #000; }\n  :not(.mdc-list--non-interactive) > .mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > .mdc-list-item--disabled.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n\nbody {\n  display: flex;\n  height: 100vh; }\n\n.mdc-drawer-app-content {\n  flex: auto;\n  overflow: auto;\n  position: relative; }\n\n.main-content {\n  overflow: auto;\n  height: 100%; }\n\n.app-bar {\n  position: absolute; }\n\n.mdc-top-app-bar {\n  z-index: 7; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/focus-trap/index.js":
/*!******************************************!*\
  !*** ./node_modules/focus-trap/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__(/*! tabbable */ "./node_modules/tabbable/index.js");
var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");

var activeFocusDelay;

var activeFocusTraps = (function() {
  var trapQueue = [];
  return {
    activateTrap: function(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },

    deactivateTrap: function(trap) {
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
})();

function focusTrap(element, userOptions) {
  var doc = document;
  var container =
    typeof element === 'string' ? doc.querySelector(element) : element;

  var config = xtend(
    {
      returnFocusOnDeactivate: true,
      escapeDeactivates: true
    },
    userOptions
  );

  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };

  return trap;

  function activate(activateOptions) {
    if (state.active) return;

    updateTabbableNodes();

    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;

    var onActivate =
      activateOptions && activateOptions.onActivate
        ? activateOptions.onActivate
        : config.onActivate;
    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;

    clearTimeout(activeFocusDelay);

    removeListeners();
    state.active = false;
    state.paused = false;

    activeFocusTraps.deactivateTrap(trap);

    var onDeactivate =
      deactivateOptions && deactivateOptions.onDeactivate !== undefined
        ? deactivateOptions.onDeactivate
        : config.onDeactivate;
    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus =
      deactivateOptions && deactivateOptions.returnFocus !== undefined
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate;
    if (returnFocus) {
      delay(function() {
        tryFocus(state.nodeFocusedBeforeActivation);
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    updateTabbableNodes();
    addListeners();
  }

  function addListeners() {
    if (!state.active) return;

    // There can be only one listening focus trap at a time
    activeFocusTraps.activateTrap(trap);

    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    activeFocusDelay = delay(function() {
      tryFocus(getInitialFocusNode());
    });

    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });

    return trap;
  }

  function removeListeners() {
    if (!state.active) return;

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function getInitialFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error(
        "You can't have a focus-trap without at least one focusable element"
      );
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.
  function checkPointerDown(e) {
    if (container.contains(e.target)) return;
    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable.isFocusable(e.target)
      });
      return;
    }
    // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)
    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }
    e.preventDefault();
  }

  // In case focus escapes the trap for some strange reason, pull it back in.
  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }
    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  }

  // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.
  function checkTab(e) {
    updateTabbableNodes();
    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }
    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode =
      tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;
    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return (
    node.tagName &&
    node.tagName.toLowerCase() === 'input' &&
    typeof node.select === 'function'
  );
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

module.exports = focusTrap;


/***/ }),

/***/ "./node_modules/html-entities/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-entities/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ "./node_modules/html-entities/lib/xml-entities.js"),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ "./node_modules/html-entities/lib/html4-entities.js"),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js"),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js")
};


/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./node_modules/tabbable/index.js":
/*!****************************************!*\
  !*** ./node_modules/tabbable/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
];
var candidateSelector = candidateSelectors.join(',');

var matches = typeof Element === 'undefined'
  ? function () {}
  : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};

  var regularTabbables = [];
  var orderedTabbables = [];

  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;
  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];

    if (!isNodeMatchingSelectorTabbable(candidate)) continue;

    candidateTabindex = getTabindex(candidate);
    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(sortOrderedTabbables)
    .map(function(a) { return a.node })
    .concat(regularTabbables);

  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node) {
  if (
    !isNodeMatchingSelectorFocusable(node)
    || isNonTabbableRadio(node)
    || getTabindex(node) < 0
  ) {
    return false;
  }
  return true;
}

function isTabbable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node);
}

function isNodeMatchingSelectorFocusable(node) {
  if (
    node.disabled
    || isHiddenInput(node)
    || isHidden(node)
  ) {
    return false;
  }
  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');
function isFocusable(node) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr;
  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true;
  // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.
  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
}

function isHidden(node) {
  // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
  // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
  return node.offsetParent === null || getComputedStyle(node).visibility === 'hidden';
}

module.exports = tabbable;


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#e8e8e8',
  lineHeight: '1.6',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left',
};

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'ff3348',
  green: '3fff4f',
  yellow: 'ffd30e',
  blue: '169be0',
  magenta: 'f840b7',
  cyan: '0ad8e9',
  lightgrey: 'ebe7e3',
  darkgrey: '6d7891',
};

var Entities = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/index.js").AllHtmlEntities;
var entities = new Entities();

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType(type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow,
  };
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' +
    color +
    '; color:#000000; padding:3px 6px; border-radius: 4px;">' +
    type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}

module.exports = function(options) {
  for (var color in options.ansiColors) {
    if (color in colors) {
      colors[color] = options.ansiColors[color];
    }
    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear,
  };
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000":
/*!****************************************************************************!*\
  !*** (webpack)-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000 ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: '/__webpack_hmr',
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {},
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
      'You should include a polyfill if you want to support this browser: ' +
      'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools'
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect)
    options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors)
    options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles)
    options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log('[HMR] connected');
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    },
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == '\uD83D\uDC93') {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ "./node_modules/webpack-hot-middleware/node_modules/strip-ansi/index.js");

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ "./node_modules/webpack-hot-middleware/client-overlay.js")({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles,
    });
  }

  var styles = {
    errors: 'color: #ff0000;',
    warnings: 'color: #999933;',
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type]
      .map(function(msg) {
        return strip(msg);
      })
      .join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : '';
    var title = '[HMR] bundle ' + name + 'has ' + obj[type].length + ' ' + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group('%c' + title, style);
      console.log('%c' + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        '%c' + title + '\n\t%c' + newProblems.replace(/\n/g, '\n\t'),
        style + 'font-weight: bold;',
        style + 'font-weight: normal;'
      );
    }
  }

  return {
    cleanProblemsCache: function() {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }
        overlay.clear();
      }
      return true;
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    },
  };
}

var processUpdate = __webpack_require__(/*! ./process-update */ "./node_modules/webpack-hot-middleware/process-update.js");

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch (obj.action) {
    case 'building':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilding'
        );
      }
      break;
    case 'built':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilt in ' +
            obj.time +
            'ms'
        );
      }
    // fall through
    case 'sync':
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      var applyUpdate = true;
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect,
  };
}

/* WEBPACK VAR INJECTION */}.call(this, "?path=/__webpack_hmr&timeout=20000", __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/node_modules/ansi-regex/index.js":
/*!*****************************************************************!*\
  !*** (webpack)-hot-middleware/node_modules/ansi-regex/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/node_modules/strip-ansi/index.js":
/*!*****************************************************************!*\
  !*** (webpack)-hot-middleware/node_modules/strip-ansi/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/webpack-hot-middleware/node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {}

var hmrDocsUrl = 'https://webpack.js.org/concepts/hot-module-replacement/'; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = {
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function(data) {
    console.warn(
      'Ignored an update to unaccepted module ' + data.chain.join(' -> ')
    );
  },
  onDeclined: function(data) {
    console.warn(
      'Ignored an update to declined module ' + data.chain.join(' -> ')
    );
  },
  onErrored: function(data) {
    console.error(data.error);
    console.warn(
      'Ignored an error while updating module ' +
        data.moduleId +
        ' (' +
        data.type +
        ')'
    );
  },
};

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == 'idle') {
    if (options.log) console.log('[HMR] Checking for updates on the server...');
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if (!updatedModules) {
        if (options.warn) {
          console.warn('[HMR] Cannot find update (Full reload needed)');
          console.warn('[HMR] (Probably because of restarting the server)');
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }
    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
      result.then(function(updatedModules) {
        cb(null, updatedModules);
      });
      result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if (unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
            '(Full reload needed)\n' +
            'This is usually because the modules which have changed ' +
            '(and their parents) do not know how to hot reload themselves. ' +
            'See ' +
            hmrDocsUrl +
            ' for more details.'
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn('[HMR]  - ' + (moduleMap[moduleId] || moduleId));
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if (!renewedModules || renewedModules.length === 0) {
        console.log('[HMR] Nothing hot updated.');
      } else {
        console.log('[HMR] Updated modules:');
        renewedModules.forEach(function(moduleId) {
          console.log('[HMR]  - ' + (moduleMap[moduleId] || moduleId));
        });
      }

      if (upToDate()) {
        console.log('[HMR] App is up to date.');
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn('[HMR] Cannot check for update (Full reload needed)');
        console.warn('[HMR] ' + (err.stack || err.message));
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn('[HMR] Update check failed: ' + (err.stack || err.message));
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn('[HMR] Reloading page');
      window.location.reload();
    }
  }
};


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_topBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/topBar.js */ "./src/js/topBar.js");

 // Needed for Hot Module Replacement

if (typeof module.hot !== 'undefined') {
  // eslint-disable-line no-undef
  module.hot.accept(); // eslint-disable-line no-undef
}

/***/ }),

/***/ "./src/js/topBar.js":
/*!**************************!*\
  !*** ./src/js/topBar.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_top_app_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/top-app-bar */ "./node_modules/@material/top-app-bar/index.js");
/* harmony import */ var _material_drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material/drawer */ "./node_modules/@material/drawer/index.js");


var topAppBar = _material_top_app_bar__WEBPACK_IMPORTED_MODULE_0__["MDCTopAppBar"].attachTo(document.getElementById('app-bar')); // eslint-disable-line no-undef

var drawer = _material_drawer__WEBPACK_IMPORTED_MODULE_1__["MDCDrawer"].attachTo(document.querySelector('.mdc-drawer')); // eslint-disable-line no-undef

topAppBar.setScrollTarget(document.getElementById('main-content')); // eslint-disable-line no-undef

topAppBar.listen('MDCTopAppBar:nav', function () {
  drawer.open = !drawer.open;
});

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../node_modules/sass-loader/dist/cjs.js??ref--7-2!./main.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./src/scss/main.scss");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../node_modules/sass-loader/dist/cjs.js??ref--7-2!./main.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./src/scss/main.scss",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../node_modules/sass-loader/dist/cjs.js??ref--7-2!./main.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js?!./src/scss/main.scss");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ 0:
/*!********************************************************************************************!*\
  !*** multi ./src/index.js webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000 ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/index.js */"./src/index.js");
module.exports = __webpack_require__(/*! webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000 */"./node_modules/webpack-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RvbS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kb20vcG9ueWZpbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2RyYXdlci9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvZHJhd2VyL21vZGFsL2ZvdW5kYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9kcmF3ZXIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL2xpc3QvY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvbGlzdC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9saXN0L2ZvdW5kYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC9yaXBwbGUvY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3JpcHBsZS9mb3VuZGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvcmlwcGxlL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtYXRlcmlhbC90b3AtYXBwLWJhci9maXhlZC9mb3VuZGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9wLWFwcC1iYXIvZm91bmRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RvcC1hcHAtYmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWF0ZXJpYWwvdG9wLWFwcC1iYXIvc2hvcnQvZm91bmRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1hdGVyaWFsL3RvcC1hcHAtYmFyL3N0YW5kYXJkL2ZvdW5kYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Fuc2ktaHRtbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9jdXMtdHJhcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaHRtbC1lbnRpdGllcy9saWIvaHRtbDQtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2h0bWwtZW50aXRpZXMvbGliL2h0bWw1LWVudGl0aWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odG1sLWVudGl0aWVzL2xpYi94bWwtZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RhYmJhYmxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9jbGllbnQtb3ZlcmxheS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWhvdC1taWRkbGV3YXJlL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLWhvdC1taWRkbGV3YXJlL25vZGVfbW9kdWxlcy9hbnNpLXJlZ2V4L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjayktaG90LW1pZGRsZXdhcmUvbm9kZV9tb2R1bGVzL3N0cmlwLWFuc2kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1ob3QtbWlkZGxld2FyZS9wcm9jZXNzLXVwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy94dGVuZC9pbW11dGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90b3BCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2RhNDUiXSwibmFtZXMiOlsibW9kdWxlIiwiaG90IiwiYWNjZXB0IiwidG9wQXBwQmFyIiwiTURDVG9wQXBwQmFyIiwiYXR0YWNoVG8iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZHJhd2VyIiwiTURDRHJhd2VyIiwicXVlcnlTZWxlY3RvciIsInNldFNjcm9sbFRhcmdldCIsImxpc3RlbiIsIm9wZW4iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsR0FBRzs7UUFFSDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0EsT0FBTztRQUNQO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrREFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SEFBNkgsbURBQW1ELEVBQUU7QUFDbEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FB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QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQix1QkFBZ0I7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Q0FHQTs7QUFDQSxJQUFHLE9BQU9BLE1BQU0sQ0FBQ0MsR0FBZCxLQUF1QixXQUExQixFQUF1QztBQUFFO0FBQ3ZDRCxRQUFNLENBQUNDLEdBQVAsQ0FBV0MsTUFBWCxHQURxQyxDQUNqQjtBQUNyQixDOzs7Ozs7Ozs7Ozs7QUNORDtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBTUMsU0FBUyxHQUFHQyxrRUFBWSxDQUFDQyxRQUFiLENBQXNCQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBdEIsQ0FBbEIsQyxDQUE2RTs7QUFDN0UsSUFBTUMsTUFBTSxHQUFHQywwREFBUyxDQUFDSixRQUFWLENBQW1CQyxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbkIsQ0FBZixDLENBQTBFOztBQUUxRVAsU0FBUyxDQUFDUSxlQUFWLENBQTBCTCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBMUIsRSxDQUFvRTs7QUFDcEVKLFNBQVMsQ0FBQ1MsTUFBVixDQUFpQixrQkFBakIsRUFBcUMsWUFBTTtBQUN6Q0osUUFBTSxDQUFDSyxJQUFQLEdBQWMsQ0FBQ0wsTUFBTSxDQUFDSyxJQUF0QjtBQUNELENBRkQsRTs7Ozs7Ozs7Ozs7QUNQQSxjQUFjLG1CQUFPLENBQUMsa09BQXdIOztBQUU5STtBQUNBLGNBQWMsUUFBUztBQUN2Qjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzSkFBMkU7O0FBRWhHO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQVU7QUFDZDtBQUNBO0FBQ0EsTUFBTSxrT0FBd0g7QUFDOUg7QUFDQSx5QkFBeUIsbUJBQU8sQ0FBQyxrT0FBd0g7O0FBRXpKO0FBQ0EseUJBQXlCLFFBQVM7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUM7QUFDQTtBQUNBLEdBQUc7QUFDSCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImRkOTAxMTI2N2E0ZmVlMjBlNmVhXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcIm1haW5cIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBNRENGb3VuZGF0aW9uIH0gZnJvbSAnLi9mb3VuZGF0aW9uJztcclxudmFyIE1EQ0NvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1EQ0NvbXBvbmVudChyb290LCBmb3VuZGF0aW9uKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvb3RfID0gcm9vdDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgdHNsaWJfMS5fX3NwcmVhZChhcmdzKSk7XHJcbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxyXG4gICAgICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XHJcbiAgICB9XHJcbiAgICBNRENDb21wb25lbnQuYXR0YWNoVG8gPSBmdW5jdGlvbiAocm9vdCkge1xyXG4gICAgICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcclxuICAgICAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcclxuICAgICAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxyXG4gICAgICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cclxuICAgICAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbih7fSkpO1xyXG4gICAgfTtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBtZXRob2QgcGFyYW0gb25seSBleGlzdHMgZm9yIHR5cGluZyBwdXJwb3NlczsgaXQgZG9lcyBub3QgbmVlZCB0byBiZSB1bml0IHRlc3RlZCAqL1xyXG4gICAgTURDQ29tcG9uZW50LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIF9hcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXHJcbiAgICAgICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcclxuICAgICAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxyXG4gICAgfTtcclxuICAgIE1EQ0NvbXBvbmVudC5wcm90b3R5cGUuZ2V0RGVmYXVsdEZvdW5kYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXHJcbiAgICAgICAgLy8gY29tcG9uZW50LlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXHJcbiAgICAgICAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XHJcbiAgICB9O1xyXG4gICAgTURDQ29tcG9uZW50LnByb3RvdHlwZS5pbml0aWFsU3luY1dpdGhET00gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cclxuICAgICAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXHJcbiAgICAgICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cclxuICAgICAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXHJcbiAgICB9O1xyXG4gICAgTURDQ29tcG9uZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXHJcbiAgICAgICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XHJcbiAgICB9O1xyXG4gICAgTURDQ29tcG9uZW50LnByb3RvdHlwZS5saXN0ZW4gPSBmdW5jdGlvbiAoZXZ0VHlwZSwgaGFuZGxlciwgb3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBvcHRpb25zKTtcclxuICAgIH07XHJcbiAgICBNRENDb21wb25lbnQucHJvdG90eXBlLnVubGlzdGVuID0gZnVuY3Rpb24gKGV2dFR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgb3B0aW9ucyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsIHdpdGggdGhlIGdpdmVuIGRhdGEuXHJcbiAgICAgKi9cclxuICAgIE1EQ0NvbXBvbmVudC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUpIHtcclxuICAgICAgICBpZiAoc2hvdWxkQnViYmxlID09PSB2b2lkIDApIHsgc2hvdWxkQnViYmxlID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZXZ0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcclxuICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcclxuICAgICAgICAgICAgICAgIGRldGFpbDogZXZ0RGF0YSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuICAgICAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1EQ0NvbXBvbmVudDtcclxufSgpKTtcclxuZXhwb3J0IHsgTURDQ29tcG9uZW50IH07XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXHJcbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50LmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG52YXIgTURDRm91bmRhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE1EQ0ZvdW5kYXRpb24oYWRhcHRlcikge1xyXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB2b2lkIDApIHsgYWRhcHRlciA9IHt9OyB9XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDRm91bmRhdGlvbiwgXCJjc3NDbGFzc2VzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxyXG4gICAgICAgICAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0ZvdW5kYXRpb24sIFwic3RyaW5nc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXHJcbiAgICAgICAgICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0ZvdW5kYXRpb24sIFwibnVtYmVyc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXHJcbiAgICAgICAgICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENGb3VuZGF0aW9uLCBcImRlZmF1bHRBZGFwdGVyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxyXG4gICAgICAgICAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcclxuICAgICAgICAgICAgLy8gdmFsaWRhdGlvbi5cclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgTURDRm91bmRhdGlvbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXHJcbiAgICB9O1xyXG4gICAgTURDRm91bmRhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1EQ0ZvdW5kYXRpb247XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE1EQ0ZvdW5kYXRpb24gfTtcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cclxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuLyoqXHJcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0XHJcbiAqIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cclxuICovXHJcbnZhciBzdXBwb3J0c1Bhc3NpdmVfO1xyXG4vKipcclxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kXHJcbiAqIGlmIHNvLCB1c2UgdGhlbS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqLCBmb3JjZVJlZnJlc2gpIHtcclxuICAgIGlmIChnbG9iYWxPYmogPT09IHZvaWQgMCkgeyBnbG9iYWxPYmogPSB3aW5kb3c7IH1cclxuICAgIGlmIChmb3JjZVJlZnJlc2ggPT09IHZvaWQgMCkgeyBmb3JjZVJlZnJlc2ggPSBmYWxzZTsgfVxyXG4gICAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcclxuICAgICAgICB2YXIgaXNTdXBwb3J0ZWRfMSA9IGZhbHNlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LCB7XHJcbiAgICAgICAgICAgICAgICBnZXQgcGFzc2l2ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZF8xID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWRfMTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIH0gLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1lbXB0eSBjYW5ub3QgdGhyb3cgZXJyb3IgZHVlIHRvIHRlc3RzLiB0c2xpbnQgYWxzbyBkaXNhYmxlcyBjb25zb2xlLmxvZy5cclxuICAgICAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWRfMTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZTtcclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHMuanMubWFwIiwiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqXHJcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKlxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqIFRIRSBTT0ZUV0FSRS5cclxuICovXHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IEEgXCJwb255ZmlsbFwiIGlzIGEgcG9seWZpbGwgdGhhdCBkb2Vzbid0IG1vZGlmeSB0aGUgZ2xvYmFsIHByb3RvdHlwZSBjaGFpbi5cclxuICogVGhpcyBtYWtlcyBwb255ZmlsbHMgc2FmZXIgdGhhbiB0cmFkaXRpb25hbCBwb2x5ZmlsbHMsIGVzcGVjaWFsbHkgZm9yIGxpYnJhcmllcyBsaWtlIE1EQy5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICBpZiAoZWxlbWVudC5jbG9zZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdChzZWxlY3Rvcik7XHJcbiAgICB9XHJcbiAgICB2YXIgZWwgPSBlbGVtZW50O1xyXG4gICAgd2hpbGUgKGVsKSB7XHJcbiAgICAgICAgaWYgKG1hdGNoZXMoZWwsIHNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yKSB7XHJcbiAgICB2YXIgbmF0aXZlTWF0Y2hlcyA9IGVsZW1lbnQubWF0Y2hlc1xyXG4gICAgICAgIHx8IGVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yXHJcbiAgICAgICAgfHwgZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcjtcclxuICAgIHJldHVybiBuYXRpdmVNYXRjaGVzLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbnlmaWxsLmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBNRENDb21wb25lbnQgfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNRENMaXN0IH0gZnJvbSAnQG1hdGVyaWFsL2xpc3QvY29tcG9uZW50JztcclxuaW1wb3J0IHsgTURDTGlzdEZvdW5kYXRpb24gfSBmcm9tICdAbWF0ZXJpYWwvbGlzdC9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGVGb2N1c1RyYXAgfSBmcm9tICdmb2N1cy10cmFwJztcclxuaW1wb3J0IHsgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uIH0gZnJvbSAnLi9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uJztcclxuaW1wb3J0IHsgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIH0gZnJvbSAnLi9tb2RhbC9mb3VuZGF0aW9uJztcclxuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwnO1xyXG52YXIgY3NzQ2xhc3NlcyA9IE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbi5jc3NDbGFzc2VzLCBzdHJpbmdzID0gTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLnN0cmluZ3M7XHJcbi8qKlxyXG4gKiBAZXZlbnRzIGBNRENEcmF3ZXI6Y2xvc2VkIHt9YCBFbWl0cyB3aGVuIHRoZSBuYXZpZ2F0aW9uIGRyYXdlciBoYXMgY2xvc2VkLlxyXG4gKiBAZXZlbnRzIGBNRENEcmF3ZXI6b3BlbmVkIHt9YCBFbWl0cyB3aGVuIHRoZSBuYXZpZ2F0aW9uIGRyYXdlciBoYXMgb3BlbmVkLlxyXG4gKi9cclxudmFyIE1EQ0RyYXdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKE1EQ0RyYXdlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE1EQ0RyYXdlcigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBNRENEcmF3ZXIuYXR0YWNoVG8gPSBmdW5jdGlvbiAocm9vdCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTURDRHJhd2VyKHJvb3QpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENEcmF3ZXIucHJvdG90eXBlLCBcIm9wZW5cIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEByZXR1cm4gYm9vbGVhbiBQcm94aWVzIHRvIHRoZSBmb3VuZGF0aW9uJ3MgYG9wZW5gL2BjbG9zZWAgbWV0aG9kcy5cclxuICAgICAgICAgKiBBbHNvIHJldHVybnMgdHJ1ZSBpZiBkcmF3ZXIgaXMgaW4gdGhlIG9wZW4gcG9zaXRpb24uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25fLmlzT3BlbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVG9nZ2xlcyB0aGUgZHJhd2VyIG9wZW4gYW5kIGNsb3NlZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpc09wZW4pIHtcclxuICAgICAgICAgICAgaWYgKGlzT3Blbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5vcGVuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvdW5kYXRpb25fLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENEcmF3ZXIucHJvdG90eXBlLCBcImxpc3RcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0XztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE1EQ0RyYXdlci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChmb2N1c1RyYXBGYWN0b3J5LCBsaXN0RmFjdG9yeSkge1xyXG4gICAgICAgIGlmIChmb2N1c1RyYXBGYWN0b3J5ID09PSB2b2lkIDApIHsgZm9jdXNUcmFwRmFjdG9yeSA9IGNyZWF0ZUZvY3VzVHJhcDsgfVxyXG4gICAgICAgIGlmIChsaXN0RmFjdG9yeSA9PT0gdm9pZCAwKSB7IGxpc3RGYWN0b3J5ID0gZnVuY3Rpb24gKGVsKSB7IHJldHVybiBuZXcgTURDTGlzdChlbCk7IH07IH1cclxuICAgICAgICB2YXIgbGlzdEVsID0gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKFwiLlwiICsgTURDTGlzdEZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5ST09UKTtcclxuICAgICAgICBpZiAobGlzdEVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdF8gPSBsaXN0RmFjdG9yeShsaXN0RWwpO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RfLndyYXBGb2N1cyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9jdXNUcmFwRmFjdG9yeV8gPSBmb2N1c1RyYXBGYWN0b3J5O1xyXG4gICAgfTtcclxuICAgIE1EQ0RyYXdlci5wcm90b3R5cGUuaW5pdGlhbFN5bmNXaXRoRE9NID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIE1PREFMID0gY3NzQ2xhc3Nlcy5NT0RBTDtcclxuICAgICAgICB2YXIgU0NSSU1fU0VMRUNUT1IgPSBzdHJpbmdzLlNDUklNX1NFTEVDVE9SO1xyXG4gICAgICAgIHRoaXMuc2NyaW1fID0gdGhpcy5yb290Xy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoU0NSSU1fU0VMRUNUT1IpO1xyXG4gICAgICAgIGlmICh0aGlzLnNjcmltXyAmJiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTY3JpbUNsaWNrXyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmZvdW5kYXRpb25fLmhhbmRsZVNjcmltQ2xpY2soKTsgfTtcclxuICAgICAgICAgICAgdGhpcy5zY3JpbV8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNjcmltQ2xpY2tfKTtcclxuICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXBfID0gdXRpbC5jcmVhdGVGb2N1c1RyYXBJbnN0YW5jZSh0aGlzLnJvb3RfLCB0aGlzLmZvY3VzVHJhcEZhY3RvcnlfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlkb3duXyA9IGZ1bmN0aW9uIChldnQpIHsgcmV0dXJuIF90aGlzLmZvdW5kYXRpb25fLmhhbmRsZUtleWRvd24oZXZ0KTsgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfID0gZnVuY3Rpb24gKGV2dCkgeyByZXR1cm4gX3RoaXMuZm91bmRhdGlvbl8uaGFuZGxlVHJhbnNpdGlvbkVuZChldnQpOyB9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duXyk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKTtcclxuICAgIH07XHJcbiAgICBNRENEcmF3ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy51bmxpc3Rlbigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bl8pO1xyXG4gICAgICAgIHRoaXMudW5saXN0ZW4oJ3RyYW5zaXRpb25lbmQnLCB0aGlzLmhhbmRsZVRyYW5zaXRpb25FbmRfKTtcclxuICAgICAgICBpZiAodGhpcy5saXN0Xykge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RfLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIE1PREFMID0gY3NzQ2xhc3Nlcy5NT0RBTDtcclxuICAgICAgICBpZiAodGhpcy5zY3JpbV8gJiYgdGhpcy5oYW5kbGVTY3JpbUNsaWNrXyAmJiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JpbV8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVNjcmltQ2xpY2tfKTtcclxuICAgICAgICAgICAgLy8gRW5zdXJlIGRyYXdlciBpcyBjbG9zZWQgdG8gaGlkZSBzY3JpbSBhbmQgcmVsZWFzZSBmb2N1c1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTURDRHJhd2VyLnByb3RvdHlwZS5nZXREZWZhdWx0Rm91bmRhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIERPIE5PVCBJTkxJTkUgdGhpcyB2YXJpYWJsZS4gRm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIGZvdW5kYXRpb25zIHRha2UgYSBQYXJ0aWFsPE1EQ0Zvb0FkYXB0ZXI+LlxyXG4gICAgICAgIC8vIFRvIGVuc3VyZSB3ZSBkb24ndCBhY2NpZGVudGFsbHkgb21pdCBhbnkgbWV0aG9kcywgd2UgbmVlZCBhIHNlcGFyYXRlLCBzdHJvbmdseSB0eXBlZCBhZGFwdGVyIHZhcmlhYmxlLlxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5cyBNZXRob2RzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgYWRhcHRlciBpbnRlcmZhY2UuXHJcbiAgICAgICAgdmFyIGFkYXB0ZXIgPSB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7IHJldHVybiBfdGhpcy5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH0sXHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7IHJldHVybiBfdGhpcy5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7IH0sXHJcbiAgICAgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7IHJldHVybiBfdGhpcy5yb290Xy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTsgfSxcclxuICAgICAgICAgICAgZWxlbWVudEhhc0NsYXNzOiBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7IHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpOyB9LFxyXG4gICAgICAgICAgICBzYXZlRm9jdXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnByZXZpb3VzRm9jdXNfID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDsgfSxcclxuICAgICAgICAgICAgcmVzdG9yZUZvY3VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNGb2N1cyA9IF90aGlzLnByZXZpb3VzRm9jdXNfO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzRm9jdXMgJiYgcHJldmlvdXNGb2N1cy5mb2N1cyAmJiBfdGhpcy5yb290Xy5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzRm9jdXMuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9jdXNBY3RpdmVOYXZpZ2F0aW9uSXRlbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZU5hdkl0ZW1FbCA9IF90aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBNRENMaXN0Rm91bmRhdGlvbi5jc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZU5hdkl0ZW1FbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZU5hdkl0ZW1FbC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub3RpZnlDbG9zZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuZW1pdChzdHJpbmdzLkNMT1NFX0VWRU5ULCB7fSwgdHJ1ZSAvKiBzaG91bGRCdWJibGUgKi8pOyB9LFxyXG4gICAgICAgICAgICBub3RpZnlPcGVuOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5lbWl0KHN0cmluZ3MuT1BFTl9FVkVOVCwge30sIHRydWUgLyogc2hvdWxkQnViYmxlICovKTsgfSxcclxuICAgICAgICAgICAgdHJhcEZvY3VzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5mb2N1c1RyYXBfLmFjdGl2YXRlKCk7IH0sXHJcbiAgICAgICAgICAgIHJlbGVhc2VGb2N1czogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuZm9jdXNUcmFwXy5kZWFjdGl2YXRlKCk7IH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xyXG4gICAgICAgIHZhciBESVNNSVNTSUJMRSA9IGNzc0NsYXNzZXMuRElTTUlTU0lCTEUsIE1PREFMID0gY3NzQ2xhc3Nlcy5NT0RBTDtcclxuICAgICAgICBpZiAodGhpcy5yb290Xy5jbGFzc0xpc3QuY29udGFpbnMoRElTTUlTU0lCTEUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uKGFkYXB0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhNT0RBTCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBNRENNb2RhbERyYXdlckZvdW5kYXRpb24oYWRhcHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNRENEcmF3ZXI6IEZhaWxlZCB0byBpbnN0YW50aWF0ZSBjb21wb25lbnQuIFN1cHBvcnRlZCB2YXJpYW50cyBhcmUgXCIgKyBESVNNSVNTSUJMRSArIFwiIGFuZCBcIiArIE1PREFMICsgXCIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTURDRHJhd2VyO1xyXG59KE1EQ0NvbXBvbmVudCkpO1xyXG5leHBvcnQgeyBNRENEcmF3ZXIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50LmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG52YXIgY3NzQ2xhc3NlcyA9IHtcclxuICAgIEFOSU1BVEU6ICdtZGMtZHJhd2VyLS1hbmltYXRlJyxcclxuICAgIENMT1NJTkc6ICdtZGMtZHJhd2VyLS1jbG9zaW5nJyxcclxuICAgIERJU01JU1NJQkxFOiAnbWRjLWRyYXdlci0tZGlzbWlzc2libGUnLFxyXG4gICAgTU9EQUw6ICdtZGMtZHJhd2VyLS1tb2RhbCcsXHJcbiAgICBPUEVOOiAnbWRjLWRyYXdlci0tb3BlbicsXHJcbiAgICBPUEVOSU5HOiAnbWRjLWRyYXdlci0tb3BlbmluZycsXHJcbiAgICBST09UOiAnbWRjLWRyYXdlcicsXHJcbn07XHJcbnZhciBzdHJpbmdzID0ge1xyXG4gICAgQVBQX0NPTlRFTlRfU0VMRUNUT1I6ICcubWRjLWRyYXdlci1hcHAtY29udGVudCcsXHJcbiAgICBDTE9TRV9FVkVOVDogJ01EQ0RyYXdlcjpjbG9zZWQnLFxyXG4gICAgT1BFTl9FVkVOVDogJ01EQ0RyYXdlcjpvcGVuZWQnLFxyXG4gICAgU0NSSU1fU0VMRUNUT1I6ICcubWRjLWRyYXdlci1zY3JpbScsXHJcbn07XHJcbmV4cG9ydCB7IGNzc0NsYXNzZXMsIHN0cmluZ3MgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBNRENGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IGNzc0NsYXNzZXMsIHN0cmluZ3MgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG52YXIgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uKGFkYXB0ZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB0c2xpYl8xLl9fYXNzaWduKHt9LCBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmFuaW1hdGlvbkZyYW1lXyA9IDA7XHJcbiAgICAgICAgX3RoaXMuYW5pbWF0aW9uVGltZXJfID0gMDtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLCBcInN0cmluZ3NcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5ncztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24sIFwiY3NzQ2xhc3Nlc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5cyBNZXRob2RzIHNob3VsZCBiZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgYWRhcHRlciBpbnRlcmZhY2UuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSxcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRIYXNDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXHJcbiAgICAgICAgICAgICAgICBub3RpZnlDbG9zZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgbm90aWZ5T3BlbjogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgc2F2ZUZvY3VzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICByZXN0b3JlRm9jdXM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGZvY3VzQWN0aXZlTmF2aWdhdGlvbkl0ZW06IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIHRyYXBGb2N1czogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgcmVsZWFzZUZvY3VzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIHRzbGludDplbmFibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uRnJhbWVfKSB7XHJcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWVfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uVGltZXJfKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1hdGlvblRpbWVyXyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogT3BlbnMgdGhlIGRyYXdlciBmcm9tIHRoZSBjbG9zZWQgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmlzT3BlbigpIHx8IHRoaXMuaXNPcGVuaW5nKCkgfHwgdGhpcy5pc0Nsb3NpbmcoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5PUEVOKTtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuQU5JTUFURSk7XHJcbiAgICAgICAgLy8gV2FpdCBhIGZyYW1lIG9uY2UgZGlzcGxheSBpcyBubyBsb25nZXIgXCJub25lXCIsIHRvIGVzdGFibGlzaCBiYXNpcyBmb3IgYW5pbWF0aW9uXHJcbiAgICAgICAgdGhpcy5ydW5OZXh0QW5pbWF0aW9uRnJhbWVfKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5PUEVOSU5HKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNhdmVGb2N1cygpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIHRoZSBkcmF3ZXIgZnJvbSB0aGUgb3BlbiBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKCkgfHwgdGhpcy5pc09wZW5pbmcoKSB8fCB0aGlzLmlzQ2xvc2luZygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkNMT1NJTkcpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBkcmF3ZXIgaXMgaW4gdGhlIG9wZW4gcG9zaXRpb24uXHJcbiAgICAgKiBAcmV0dXJuIHRydWUgaWYgZHJhd2VyIGlzIGluIG9wZW4gc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUuaXNPcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuT1BFTik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGRyYXdlciBpcyBhbmltYXRpbmcgb3Blbi5cclxuICAgICAqIEByZXR1cm4gdHJ1ZSBpZiBkcmF3ZXIgaXMgYW5pbWF0aW5nIG9wZW4uXHJcbiAgICAgKi9cclxuICAgIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUuaXNPcGVuaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmhhc0NsYXNzKGNzc0NsYXNzZXMuT1BFTklORykgfHwgdGhpcy5hZGFwdGVyXy5oYXNDbGFzcyhjc3NDbGFzc2VzLkFOSU1BVEUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBkcmF3ZXIgaXMgYW5pbWF0aW5nIGNsb3NlZC5cclxuICAgICAqIEByZXR1cm4gdHJ1ZSBpZiBkcmF3ZXIgaXMgYW5pbWF0aW5nIGNsb3NlZC5cclxuICAgICAqL1xyXG4gICAgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uLnByb3RvdHlwZS5pc0Nsb3NpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5DTE9TSU5HKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEtleWRvd24gaGFuZGxlciB0byBjbG9zZSBkcmF3ZXIgd2hlbiBrZXkgaXMgZXNjYXBlLlxyXG4gICAgICovXHJcbiAgICBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZUtleWRvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgdmFyIGtleUNvZGUgPSBldnQua2V5Q29kZSwga2V5ID0gZXZ0LmtleTtcclxuICAgICAgICB2YXIgaXNFc2NhcGUgPSBrZXkgPT09ICdFc2NhcGUnIHx8IGtleUNvZGUgPT09IDI3O1xyXG4gICAgICAgIGlmIChpc0VzY2FwZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgYHRyYW5zaXRpb25lbmRgIGV2ZW50IHdoZW4gdGhlIGRyYXdlciBmaW5pc2hlcyBvcGVuaW5nL2Nsb3NpbmcuXHJcbiAgICAgKi9cclxuICAgIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgT1BFTklORyA9IGNzc0NsYXNzZXMuT1BFTklORywgQ0xPU0lORyA9IGNzc0NsYXNzZXMuQ0xPU0lORywgT1BFTiA9IGNzc0NsYXNzZXMuT1BFTiwgQU5JTUFURSA9IGNzc0NsYXNzZXMuQU5JTUFURSwgUk9PVCA9IGNzc0NsYXNzZXMuUk9PVDtcclxuICAgICAgICAvLyBJbiBFZGdlLCB0cmFuc2l0aW9uZW5kIG9uIHJpcHBsZSBwc2V1ZG8tZWxlbWVudHMgeWllbGRzIGEgdGFyZ2V0IHdpdGhvdXQgY2xhc3NMaXN0LCBzbyBjaGVjayBmb3IgRWxlbWVudCBmaXJzdC5cclxuICAgICAgICB2YXIgaXNSb290RWxlbWVudCA9IHRoaXMuaXNFbGVtZW50XyhldnQudGFyZ2V0KSAmJiB0aGlzLmFkYXB0ZXJfLmVsZW1lbnRIYXNDbGFzcyhldnQudGFyZ2V0LCBST09UKTtcclxuICAgICAgICBpZiAoIWlzUm9vdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0Nsb3NpbmcoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9QRU4pO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZF8oKTtcclxuICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5yZXN0b3JlRm9jdXMoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlDbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5mb2N1c0FjdGl2ZU5hdmlnYXRpb25JdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbmVkXygpO1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeU9wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhBTklNQVRFKTtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE9QRU5JTkcpO1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoQ0xPU0lORyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbnNpb24gcG9pbnQgZm9yIHdoZW4gZHJhd2VyIGZpbmlzaGVzIG9wZW4gYW5pbWF0aW9uLlxyXG4gICAgICovXHJcbiAgICBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24ucHJvdG90eXBlLm9wZW5lZF8gPSBmdW5jdGlvbiAoKSB7IH07IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZW1wdHlcclxuICAgIC8qKlxyXG4gICAgICogRXh0ZW5zaW9uIHBvaW50IGZvciB3aGVuIGRyYXdlciBmaW5pc2hlcyBjbG9zZSBhbmltYXRpb24uXHJcbiAgICAgKi9cclxuICAgIE1EQ0Rpc21pc3NpYmxlRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUuY2xvc2VkXyA9IGZ1bmN0aW9uICgpIHsgfTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1lbXB0eVxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW5zIHRoZSBnaXZlbiBsb2dpYyBvbiB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUsIHVzaW5nIHNldFRpbWVvdXQgdG8gZmFjdG9yIGluIEZpcmVmb3ggcmVmbG93IGJlaGF2aW9yLlxyXG4gICAgICovXHJcbiAgICBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24ucHJvdG90eXBlLnJ1bk5leHRBbmltYXRpb25GcmFtZV8gPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWVfKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmFuaW1hdGlvbkZyYW1lXyA9IDA7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy5hbmltYXRpb25UaW1lcl8pO1xyXG4gICAgICAgICAgICBfdGhpcy5hbmltYXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24ucHJvdG90eXBlLmlzRWxlbWVudF8gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgIC8vIEluIEVkZ2UsIHRyYW5zaXRpb25lbmQgb24gcmlwcGxlIHBzZXVkby1lbGVtZW50cyB5aWVsZHMgYSB0YXJnZXQgd2l0aG91dCBjbGFzc0xpc3QuXHJcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oZWxlbWVudC5jbGFzc0xpc3QpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb247XHJcbn0oTURDRm91bmRhdGlvbikpO1xyXG5leHBvcnQgeyBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24gfTtcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlZmF1bHQtZXhwb3J0IE5lZWRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIE1EQyBXZWIgdjAuNDQuMCBhbmQgZWFybGllci5cclxuZXhwb3J0IGRlZmF1bHQgTURDRGlzbWlzc2libGVEcmF3ZXJGb3VuZGF0aW9uO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCc7XHJcbmV4cG9ydCB7IHV0aWwgfTtcclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGlzbWlzc2libGUvZm91bmRhdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vbW9kYWwvZm91bmRhdGlvbic7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24gfSBmcm9tICcuLi9kaXNtaXNzaWJsZS9mb3VuZGF0aW9uJztcclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHN1YmNsYXNzIGlzIG5vdCBhIGJyYW5jaCBzdGF0ZW1lbnQgKi9cclxudmFyIE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbiwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgY2xpY2sgZXZlbnQgb24gc2NyaW0uXHJcbiAgICAgKi9cclxuICAgIE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlU2NyaW1DbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmF3ZXIgZmluaXNoZXMgb3BlbiBhbmltYXRpb24uXHJcbiAgICAgKi9cclxuICAgIE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbi5wcm90b3R5cGUub3BlbmVkXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnRyYXBGb2N1cygpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gZHJhd2VyIGZpbmlzaGVzIGNsb3NlIGFuaW1hdGlvbi5cclxuICAgICAqL1xyXG4gICAgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uLnByb3RvdHlwZS5jbG9zZWRfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVsZWFzZUZvY3VzKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbjtcclxufShNRENEaXNtaXNzaWJsZURyYXdlckZvdW5kYXRpb24pKTtcclxuZXhwb3J0IHsgTURDTW9kYWxEcmF3ZXJGb3VuZGF0aW9uIH07XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXHJcbmV4cG9ydCBkZWZhdWx0IE1EQ01vZGFsRHJhd2VyRm91bmRhdGlvbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGVGb2N1c1RyYXAgfSBmcm9tICdmb2N1cy10cmFwJztcclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvY3VzVHJhcEluc3RhbmNlKHN1cmZhY2VFbCwgZm9jdXNUcmFwRmFjdG9yeSkge1xyXG4gICAgaWYgKGZvY3VzVHJhcEZhY3RvcnkgPT09IHZvaWQgMCkgeyBmb2N1c1RyYXBGYWN0b3J5ID0gY3JlYXRlRm9jdXNUcmFwOyB9XHJcbiAgICByZXR1cm4gZm9jdXNUcmFwRmFjdG9yeShzdXJmYWNlRWwsIHtcclxuICAgICAgICBjbGlja091dHNpZGVEZWFjdGl2YXRlczogdHJ1ZSxcclxuICAgICAgICBlc2NhcGVEZWFjdGl2YXRlczogZmFsc2UsXHJcbiAgICAgICAgaW5pdGlhbEZvY3VzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgcmV0dXJuRm9jdXNPbkRlYWN0aXZhdGU6IGZhbHNlLFxyXG4gICAgfSk7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgTURDQ29tcG9uZW50IH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcclxuaW1wb3J0IHsgY2xvc2VzdCwgbWF0Y2hlcyB9IGZyb20gJ0BtYXRlcmlhbC9kb20vcG9ueWZpbGwnO1xyXG5pbXBvcnQgeyBjc3NDbGFzc2VzLCBzdHJpbmdzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNRENMaXN0Rm91bmRhdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbic7XHJcbnZhciBNRENMaXN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTURDTGlzdCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE1EQ0xpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0xpc3QucHJvdG90eXBlLCBcInZlcnRpY2FsXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb25fLnNldFZlcnRpY2FsT3JpZW50YXRpb24odmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0xpc3QucHJvdG90eXBlLCBcImxpc3RFbGVtZW50c1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChcIi5cIiArIGNzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTGlzdC5wcm90b3R5cGUsIFwid3JhcEZvY3VzXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb25fLnNldFdyYXBGb2N1cyh2YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTGlzdC5wcm90b3R5cGUsIFwic2luZ2xlU2VsZWN0aW9uXCIsIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChpc1NpbmdsZVNlbGVjdGlvbkxpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRTaW5nbGVTZWxlY3Rpb24oaXNTaW5nbGVTZWxlY3Rpb25MaXN0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENMaXN0LnByb3RvdHlwZSwgXCJzZWxlY3RlZEluZGV4XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbl8uZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRTZWxlY3RlZEluZGV4KGluZGV4KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE1EQ0xpc3QuYXR0YWNoVG8gPSBmdW5jdGlvbiAocm9vdCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTURDTGlzdChyb290KTtcclxuICAgIH07XHJcbiAgICBNRENMaXN0LnByb3RvdHlwZS5pbml0aWFsU3luY1dpdGhET00gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVDbGlja18gPSB0aGlzLmhhbmRsZUNsaWNrRXZlbnRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlkb3duXyA9IHRoaXMuaGFuZGxlS2V5ZG93bkV2ZW50Xy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZm9jdXNJbkV2ZW50TGlzdGVuZXJfID0gdGhpcy5oYW5kbGVGb2N1c0luRXZlbnRfLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5mb2N1c091dEV2ZW50TGlzdGVuZXJfID0gdGhpcy5oYW5kbGVGb2N1c091dEV2ZW50Xy5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlkb3duXyk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGlja18pO1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCdmb2N1c2luJywgdGhpcy5mb2N1c0luRXZlbnRMaXN0ZW5lcl8pO1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCdmb2N1c291dCcsIHRoaXMuZm9jdXNPdXRFdmVudExpc3RlbmVyXyk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVMaXN0VHlwZSgpO1xyXG4gICAgfTtcclxuICAgIE1EQ0xpc3QucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy51bmxpc3Rlbigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5ZG93bl8pO1xyXG4gICAgICAgIHRoaXMudW5saXN0ZW4oJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGlja18pO1xyXG4gICAgICAgIHRoaXMudW5saXN0ZW4oJ2ZvY3VzaW4nLCB0aGlzLmZvY3VzSW5FdmVudExpc3RlbmVyXyk7XHJcbiAgICAgICAgdGhpcy51bmxpc3RlbignZm9jdXNvdXQnLCB0aGlzLmZvY3VzT3V0RXZlbnRMaXN0ZW5lcl8pO1xyXG4gICAgfTtcclxuICAgIE1EQ0xpc3QucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5yb290Xy5nZXRBdHRyaWJ1dGUoc3RyaW5ncy5BUklBX09SSUVOVEFUSU9OKTtcclxuICAgICAgICB0aGlzLnZlcnRpY2FsID0gZGlyZWN0aW9uICE9PSBzdHJpbmdzLkFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTDtcclxuICAgICAgICAvLyBMaXN0IGl0ZW1zIG5lZWQgdG8gaGF2ZSBhdCBsZWFzdCB0YWJpbmRleD0tMSB0byBiZSBmb2N1c2FibGUuXHJcbiAgICAgICAgW10uc2xpY2UuY2FsbCh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZGMtbGlzdC1pdGVtOm5vdChbdGFiaW5kZXhdKScpKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIENoaWxkIGJ1dHRvbi9hIGVsZW1lbnRzIGFyZSBub3QgdGFiYmFibGUgdW50aWwgdGhlIGxpc3QgaXRlbSBpcyBmb2N1c2VkLlxyXG4gICAgICAgIFtdLnNsaWNlLmNhbGwodGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yQWxsKHN0cmluZ3MuRk9DVVNBQkxFX0NISUxEX0VMRU1FTlRTKSlcclxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7IH0pO1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbl8ubGF5b3V0KCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIHNlbGVjdGVkSW5kZXggdmFsdWUgYmFzZWQgb24gcHJlLXNlbGVjdGVkIGNoZWNrYm94IGxpc3QgaXRlbXMsIHNpbmdsZSBzZWxlY3Rpb24gb3IgcmFkaW8uXHJcbiAgICAgKi9cclxuICAgIE1EQ0xpc3QucHJvdG90eXBlLmluaXRpYWxpemVMaXN0VHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjaGVja2JveExpc3RJdGVtcyA9IHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChzdHJpbmdzLkFSSUFfUk9MRV9DSEVDS0JPWF9TRUxFQ1RPUik7XHJcbiAgICAgICAgdmFyIHNpbmdsZVNlbGVjdGVkTGlzdEl0ZW0gPSB0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoXCJcXG4gICAgICAuXCIgKyBjc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1MgKyBcIixcXG4gICAgICAuXCIgKyBjc3NDbGFzc2VzLkxJU1RfSVRFTV9TRUxFQ1RFRF9DTEFTUyArIFwiXFxuICAgIFwiKTtcclxuICAgICAgICB2YXIgcmFkaW9TZWxlY3RlZExpc3RJdGVtID0gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKHN0cmluZ3MuQVJJQV9DSEVDS0VEX1JBRElPX1NFTEVDVE9SKTtcclxuICAgICAgICBpZiAoY2hlY2tib3hMaXN0SXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVzZWxlY3RlZEl0ZW1zID0gdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yQWxsKHN0cmluZ3MuQVJJQV9DSEVDS0VEX0NIRUNLQk9YX1NFTEVDVE9SKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID1cclxuICAgICAgICAgICAgICAgIFtdLm1hcC5jYWxsKHByZXNlbGVjdGVkSXRlbXMsIGZ1bmN0aW9uIChsaXN0SXRlbSkgeyByZXR1cm4gX3RoaXMubGlzdEVsZW1lbnRzLmluZGV4T2YobGlzdEl0ZW0pOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2luZ2xlU2VsZWN0ZWRMaXN0SXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoc2luZ2xlU2VsZWN0ZWRMaXN0SXRlbS5jbGFzc0xpc3QuY29udGFpbnMoY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQUNUSVZBVEVEX0NMQVNTKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRVc2VBY3RpdmF0ZWRDbGFzcyh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNpbmdsZVNlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGlzdEVsZW1lbnRzLmluZGV4T2Yoc2luZ2xlU2VsZWN0ZWRMaXN0SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJhZGlvU2VsZWN0ZWRMaXN0SXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmxpc3RFbGVtZW50cy5pbmRleE9mKHJhZGlvU2VsZWN0ZWRMaXN0SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE1EQ0xpc3QucHJvdG90eXBlLmdldERlZmF1bHRGb3VuZGF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gRE8gTk9UIElOTElORSB0aGlzIHZhcmlhYmxlLiBGb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgZm91bmRhdGlvbnMgdGFrZSBhIFBhcnRpYWw8TURDRm9vQWRhcHRlcj4uXHJcbiAgICAgICAgLy8gVG8gZW5zdXJlIHdlIGRvbid0IGFjY2lkZW50YWxseSBvbWl0IGFueSBtZXRob2RzLCB3ZSBuZWVkIGEgc2VwYXJhdGUsIHN0cm9uZ2x5IHR5cGVkIGFkYXB0ZXIgdmFyaWFibGUuXHJcbiAgICAgICAgdmFyIGFkYXB0ZXIgPSB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzRm9yRWxlbWVudEluZGV4OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfdGhpcy5saXN0RWxlbWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9jdXNJdGVtQXRJbmRleDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF90aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiBmdW5jdGlvbiAoaW5kZXgsIGF0dHIpIHsgcmV0dXJuIF90aGlzLmxpc3RFbGVtZW50c1tpbmRleF0uZ2V0QXR0cmlidXRlKGF0dHIpOyB9LFxyXG4gICAgICAgICAgICBnZXRGb2N1c2VkRWxlbWVudEluZGV4OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5saXN0RWxlbWVudHMuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTsgfSxcclxuICAgICAgICAgICAgZ2V0TGlzdEl0ZW1Db3VudDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMubGlzdEVsZW1lbnRzLmxlbmd0aDsgfSxcclxuICAgICAgICAgICAgaGFzQ2hlY2tib3hBdEluZGV4OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0SXRlbSA9IF90aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISFsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKHN0cmluZ3MuQ0hFQ0tCT1hfU0VMRUNUT1IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXNSYWRpb0F0SW5kZXg6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RJdGVtID0gX3RoaXMubGlzdEVsZW1lbnRzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIWxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3Ioc3RyaW5ncy5SQURJT19TRUxFQ1RPUik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzQ2hlY2tib3hDaGVja2VkQXRJbmRleDogZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSBfdGhpcy5saXN0RWxlbWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZUVsID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihzdHJpbmdzLkNIRUNLQk9YX1NFTEVDVE9SKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGVFbC5jaGVja2VkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0ZvY3VzSW5zaWRlTGlzdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnJvb3RfLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc1Jvb3RGb2N1c2VkOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBfdGhpcy5yb290XzsgfSxcclxuICAgICAgICAgICAgbm90aWZ5QWN0aW9uOiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoc3RyaW5ncy5BQ1RJT05fRVZFTlQsIHsgaW5kZXg6IGluZGV4IH0sIC8qKiBzaG91bGRCdWJibGUgKi8gdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4OiBmdW5jdGlvbiAoaW5kZXgsIGNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfdGhpcy5saXN0RWxlbWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4OiBmdW5jdGlvbiAoaW5kZXgsIGF0dHIsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IF90aGlzLmxpc3RFbGVtZW50c1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0Q2hlY2tlZENoZWNrYm94T3JSYWRpb0F0SW5kZXg6IGZ1bmN0aW9uIChpbmRleCwgaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSBfdGhpcy5saXN0RWxlbWVudHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvZ2dsZUVsID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihzdHJpbmdzLkNIRUNLQk9YX1JBRElPX1NFTEVDVE9SKTtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUVsLmNoZWNrZWQgPSBpc0NoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCgnY2hhbmdlJywgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVFbC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VGFiSW5kZXhGb3JMaXN0SXRlbUNoaWxkcmVuOiBmdW5jdGlvbiAobGlzdEl0ZW1JbmRleCwgdGFiSW5kZXhWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBfdGhpcy5saXN0RWxlbWVudHNbbGlzdEl0ZW1JbmRleF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdEl0ZW1DaGlsZHJlbiA9IFtdLnNsaWNlLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHN0cmluZ3MuQ0hJTERfRUxFTUVOVFNfVE9fVE9HR0xFX1RBQklOREVYKSk7XHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbUNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgdGFiSW5kZXhWYWx1ZSk7IH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNRENMaXN0Rm91bmRhdGlvbihhZGFwdGVyKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gZmlndXJlIG91dCB3aGljaCBsaXN0IGl0ZW0gdGhpcyBldmVudCBpcyB0YXJnZXR0aW5nLiBPciByZXR1cm5zIC0xIGlmXHJcbiAgICAgKiB0aGVyZSBpcyBubyBsaXN0IGl0ZW1cclxuICAgICAqL1xyXG4gICAgTURDTGlzdC5wcm90b3R5cGUuZ2V0TGlzdEl0ZW1JbmRleF8gPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgdmFyIGV2ZW50VGFyZ2V0ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICB2YXIgbmVhcmVzdFBhcmVudCA9IGNsb3Nlc3QoZXZlbnRUYXJnZXQsIFwiLlwiICsgY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MgKyBcIiwgLlwiICsgY3NzQ2xhc3Nlcy5ST09UKTtcclxuICAgICAgICAvLyBHZXQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGlmIGl0IGlzIGEgbGlzdCBpdGVtLlxyXG4gICAgICAgIGlmIChuZWFyZXN0UGFyZW50ICYmIG1hdGNoZXMobmVhcmVzdFBhcmVudCwgXCIuXCIgKyBjc3NDbGFzc2VzLkxJU1RfSVRFTV9DTEFTUykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdEVsZW1lbnRzLmluZGV4T2YobmVhcmVzdFBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gZmlndXJlIG91dCB3aGljaCBlbGVtZW50IHdhcyBjbGlja2VkIGJlZm9yZSBzZW5kaW5nIHRoZSBldmVudCB0byB0aGUgZm91bmRhdGlvbi5cclxuICAgICAqL1xyXG4gICAgTURDTGlzdC5wcm90b3R5cGUuaGFuZGxlRm9jdXNJbkV2ZW50XyA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldExpc3RJdGVtSW5kZXhfKGV2dCk7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5oYW5kbGVGb2N1c0luKGV2dCwgaW5kZXgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGVsZW1lbnQgd2FzIGNsaWNrZWQgYmVmb3JlIHNlbmRpbmcgdGhlIGV2ZW50IHRvIHRoZSBmb3VuZGF0aW9uLlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0LnByb3RvdHlwZS5oYW5kbGVGb2N1c091dEV2ZW50XyA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldExpc3RJdGVtSW5kZXhfKGV2dCk7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5oYW5kbGVGb2N1c091dChldnQsIGluZGV4KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gZmlndXJlIG91dCB3aGljaCBlbGVtZW50IHdhcyBmb2N1c2VkIHdoZW4ga2V5ZG93biBldmVudCBvY2N1cnJlZCBiZWZvcmUgc2VuZGluZyB0aGUgZXZlbnQgdG8gdGhlXHJcbiAgICAgKiBmb3VuZGF0aW9uLlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0LnByb3RvdHlwZS5oYW5kbGVLZXlkb3duRXZlbnRfID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0TGlzdEl0ZW1JbmRleF8oZXZ0KTtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZUtleWRvd24oZXZ0LCB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTKSwgaW5kZXgpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBmaWd1cmUgb3V0IHdoaWNoIGVsZW1lbnQgd2FzIGNsaWNrZWQgYmVmb3JlIHNlbmRpbmcgdGhlIGV2ZW50IHRvIHRoZSBmb3VuZGF0aW9uLlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0LnByb3RvdHlwZS5oYW5kbGVDbGlja0V2ZW50XyA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldExpc3RJdGVtSW5kZXhfKGV2dCk7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgLy8gVG9nZ2xlIHRoZSBjaGVja2JveCBvbmx5IGlmIGl0J3Mgbm90IHRoZSB0YXJnZXQgb2YgdGhlIGV2ZW50LCBvciB0aGUgY2hlY2tib3ggd2lsbCBoYXZlIDIgY2hhbmdlIGV2ZW50cy5cclxuICAgICAgICB2YXIgdG9nZ2xlQ2hlY2tib3ggPSAhbWF0Y2hlcyh0YXJnZXQsIHN0cmluZ3MuQ0hFQ0tCT1hfUkFESU9fU0VMRUNUT1IpO1xyXG4gICAgICAgIHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlQ2xpY2soaW5kZXgsIHRvZ2dsZUNoZWNrYm94KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTURDTGlzdDtcclxufShNRENDb21wb25lbnQpKTtcclxuZXhwb3J0IHsgTURDTGlzdCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnQuanMubWFwIiwiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqXHJcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKlxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqIFRIRSBTT0ZUV0FSRS5cclxuICovXHJcbnZhciBjc3NDbGFzc2VzID0ge1xyXG4gICAgTElTVF9JVEVNX0FDVElWQVRFRF9DTEFTUzogJ21kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZCcsXHJcbiAgICBMSVNUX0lURU1fQ0xBU1M6ICdtZGMtbGlzdC1pdGVtJyxcclxuICAgIExJU1RfSVRFTV9ESVNBQkxFRF9DTEFTUzogJ21kYy1saXN0LWl0ZW0tLWRpc2FibGVkJyxcclxuICAgIExJU1RfSVRFTV9TRUxFQ1RFRF9DTEFTUzogJ21kYy1saXN0LWl0ZW0tLXNlbGVjdGVkJyxcclxuICAgIFJPT1Q6ICdtZGMtbGlzdCcsXHJcbn07XHJcbnZhciBzdHJpbmdzID0ge1xyXG4gICAgQUNUSU9OX0VWRU5UOiAnTURDTGlzdDphY3Rpb24nLFxyXG4gICAgQVJJQV9DSEVDS0VEOiAnYXJpYS1jaGVja2VkJyxcclxuICAgIEFSSUFfQ0hFQ0tFRF9DSEVDS0JPWF9TRUxFQ1RPUjogJ1tyb2xlPVwiY2hlY2tib3hcIl1bYXJpYS1jaGVja2VkPVwidHJ1ZVwiXScsXHJcbiAgICBBUklBX0NIRUNLRURfUkFESU9fU0VMRUNUT1I6ICdbcm9sZT1cInJhZGlvXCJdW2FyaWEtY2hlY2tlZD1cInRydWVcIl0nLFxyXG4gICAgQVJJQV9DVVJSRU5UOiAnYXJpYS1jdXJyZW50JyxcclxuICAgIEFSSUFfT1JJRU5UQVRJT046ICdhcmlhLW9yaWVudGF0aW9uJyxcclxuICAgIEFSSUFfT1JJRU5UQVRJT05fSE9SSVpPTlRBTDogJ2hvcml6b250YWwnLFxyXG4gICAgQVJJQV9ST0xFX0NIRUNLQk9YX1NFTEVDVE9SOiAnW3JvbGU9XCJjaGVja2JveFwiXScsXHJcbiAgICBBUklBX1NFTEVDVEVEOiAnYXJpYS1zZWxlY3RlZCcsXHJcbiAgICBDSEVDS0JPWF9SQURJT19TRUxFQ1RPUjogJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXTpub3QoOmRpc2FibGVkKSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdOm5vdCg6ZGlzYWJsZWQpJyxcclxuICAgIENIRUNLQk9YX1NFTEVDVE9SOiAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOm5vdCg6ZGlzYWJsZWQpJyxcclxuICAgIENISUxEX0VMRU1FTlRTX1RPX1RPR0dMRV9UQUJJTkRFWDogXCJcXG4gICAgLlwiICsgY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MgKyBcIiBidXR0b246bm90KDpkaXNhYmxlZCksXFxuICAgIC5cIiArIGNzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTICsgXCIgYVxcbiAgXCIsXHJcbiAgICBGT0NVU0FCTEVfQ0hJTERfRUxFTUVOVFM6IFwiXFxuICAgIC5cIiArIGNzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTICsgXCIgYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLFxcbiAgICAuXCIgKyBjc3NDbGFzc2VzLkxJU1RfSVRFTV9DTEFTUyArIFwiIGEsXFxuICAgIC5cIiArIGNzc0NsYXNzZXMuTElTVF9JVEVNX0NMQVNTICsgXCIgaW5wdXRbdHlwZT1cXFwicmFkaW9cXFwiXTpub3QoOmRpc2FibGVkKSxcXG4gICAgLlwiICsgY3NzQ2xhc3Nlcy5MSVNUX0lURU1fQ0xBU1MgKyBcIiBpbnB1dFt0eXBlPVxcXCJjaGVja2JveFxcXCJdOm5vdCg6ZGlzYWJsZWQpXFxuICBcIixcclxuICAgIFJBRElPX1NFTEVDVE9SOiAnaW5wdXRbdHlwZT1cInJhZGlvXCJdOm5vdCg6ZGlzYWJsZWQpJyxcclxufTtcclxudmFyIG51bWJlcnMgPSB7XHJcbiAgICBVTlNFVF9JTkRFWDogLTEsXHJcbn07XHJcbmV4cG9ydCB7IHN0cmluZ3MsIGNzc0NsYXNzZXMsIG51bWJlcnMgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBNRENGb3VuZGF0aW9uIH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IGNzc0NsYXNzZXMsIG51bWJlcnMsIHN0cmluZ3MgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbnZhciBFTEVNRU5UU19LRVlfQUxMT1dFRF9JTiA9IFsnaW5wdXQnLCAnYnV0dG9uJywgJ3RleHRhcmVhJywgJ3NlbGVjdCddO1xyXG5mdW5jdGlvbiBpc051bWJlckFycmF5KHNlbGVjdGVkSW5kZXgpIHtcclxuICAgIHJldHVybiBzZWxlY3RlZEluZGV4IGluc3RhbmNlb2YgQXJyYXk7XHJcbn1cclxudmFyIE1EQ0xpc3RGb3VuZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTURDTGlzdEZvdW5kYXRpb24sIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBNRENMaXN0Rm91bmRhdGlvbihhZGFwdGVyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdHNsaWJfMS5fX2Fzc2lnbih7fSwgTURDTGlzdEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLndyYXBGb2N1c18gPSBmYWxzZTtcclxuICAgICAgICBfdGhpcy5pc1ZlcnRpY2FsXyA9IHRydWU7XHJcbiAgICAgICAgX3RoaXMuaXNTaW5nbGVTZWxlY3Rpb25MaXN0XyA9IGZhbHNlO1xyXG4gICAgICAgIF90aGlzLnNlbGVjdGVkSW5kZXhfID0gbnVtYmVycy5VTlNFVF9JTkRFWDtcclxuICAgICAgICBfdGhpcy5mb2N1c2VkSXRlbUluZGV4XyA9IG51bWJlcnMuVU5TRVRfSU5ERVg7XHJcbiAgICAgICAgX3RoaXMudXNlQWN0aXZhdGVkQ2xhc3NfID0gZmFsc2U7XHJcbiAgICAgICAgX3RoaXMuYXJpYUN1cnJlbnRBdHRyVmFsdWVfID0gbnVsbDtcclxuICAgICAgICBfdGhpcy5pc0NoZWNrYm94TGlzdF8gPSBmYWxzZTtcclxuICAgICAgICBfdGhpcy5pc1JhZGlvTGlzdF8gPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTGlzdEZvdW5kYXRpb24sIFwic3RyaW5nc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ0xpc3RGb3VuZGF0aW9uLCBcImNzc0NsYXNzZXNcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3NzQ2xhc3NlcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENMaXN0Rm91bmRhdGlvbiwgXCJudW1iZXJzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcnM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDTGlzdEZvdW5kYXRpb24sIFwiZGVmYXVsdEFkYXB0ZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NGb3JFbGVtZW50SW5kZXg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGZvY3VzSXRlbUF0SW5kZXg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGdldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSxcclxuICAgICAgICAgICAgICAgIGdldEZvY3VzZWRFbGVtZW50SW5kZXg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXHJcbiAgICAgICAgICAgICAgICBnZXRMaXN0SXRlbUNvdW50OiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9LFxyXG4gICAgICAgICAgICAgICAgaGFzQ2hlY2tib3hBdEluZGV4OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSxcclxuICAgICAgICAgICAgICAgIGhhc1JhZGlvQXRJbmRleDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXHJcbiAgICAgICAgICAgICAgICBpc0NoZWNrYm94Q2hlY2tlZEF0SW5kZXg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxyXG4gICAgICAgICAgICAgICAgaXNGb2N1c0luc2lkZUxpc3Q6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxyXG4gICAgICAgICAgICAgICAgaXNSb290Rm9jdXNlZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH0sXHJcbiAgICAgICAgICAgICAgICBub3RpZnlBY3Rpb246IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzRm9yRWxlbWVudEluZGV4OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXg6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIHNldENoZWNrZWRDaGVja2JveE9yUmFkaW9BdEluZGV4OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICBzZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW46IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE1EQ0xpc3RGb3VuZGF0aW9uLnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0TGlzdEl0ZW1Db3VudCgpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2hlY2tib3hBdEluZGV4KDApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDaGVja2JveExpc3RfID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hZGFwdGVyXy5oYXNSYWRpb0F0SW5kZXgoMCkpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1JhZGlvTGlzdF8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHByaXZhdGUgd3JhcEZvY3VzXyB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFdyYXBGb2N1cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMud3JhcEZvY3VzXyA9IHZhbHVlO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgaXNWZXJ0aWNhbF8gcHJpdmF0ZSB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFZlcnRpY2FsT3JpZW50YXRpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmlzVmVydGljYWxfID0gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBpc1NpbmdsZVNlbGVjdGlvbkxpc3RfIHByaXZhdGUgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIE1EQ0xpc3RGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRTaW5nbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTGlzdF8gPSB2YWx1ZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHVzZUFjdGl2YXRlZENsYXNzXyBwcml2YXRlIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0VXNlQWN0aXZhdGVkQ2xhc3MgPSBmdW5jdGlvbiAodXNlQWN0aXZhdGVkKSB7XHJcbiAgICAgICAgdGhpcy51c2VBY3RpdmF0ZWRDbGFzc18gPSB1c2VBY3RpdmF0ZWQ7XHJcbiAgICB9O1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleF87XHJcbiAgICB9O1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFNlbGVjdGVkSW5kZXggPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNJbmRleFZhbGlkXyhpbmRleCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94TGlzdF8pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDaGVja2JveEF0SW5kZXhfKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc1JhZGlvTGlzdF8pIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRSYWRpb0F0SW5kZXhfKGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2luZ2xlU2VsZWN0aW9uQXRJbmRleF8oaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzIGluIGhhbmRsZXIgZm9yIHRoZSBsaXN0IGl0ZW1zLlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlRm9jdXNJbiA9IGZ1bmN0aW9uIChfLCBsaXN0SXRlbUluZGV4KSB7XHJcbiAgICAgICAgaWYgKGxpc3RJdGVtSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldFRhYkluZGV4Rm9yTGlzdEl0ZW1DaGlsZHJlbihsaXN0SXRlbUluZGV4LCAnMCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzIG91dCBoYW5kbGVyIGZvciB0aGUgbGlzdCBpdGVtcy5cclxuICAgICAqL1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZUZvY3VzT3V0ID0gZnVuY3Rpb24gKF8sIGxpc3RJdGVtSW5kZXgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChsaXN0SXRlbUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRUYWJJbmRleEZvckxpc3RJdGVtQ2hpbGRyZW4obGlzdEl0ZW1JbmRleCwgJy0xJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJldHdlZW4gRm9jdXNvdXQgJiBGb2N1c2luIHNvbWUgYnJvd3NlcnMgZG8gbm90IGhhdmUgZm9jdXMgb24gYW55IGVsZW1lbnQuIFNldHRpbmcgYSBkZWxheSB0byB3YWl0IHRpbGwgdGhlIGZvY3VzXHJcbiAgICAgICAgICogaXMgbW92ZWQgdG8gbmV4dCBlbGVtZW50LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIV90aGlzLmFkYXB0ZXJfLmlzRm9jdXNJbnNpZGVMaXN0KCkpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFRhYmluZGV4VG9GaXJzdFNlbGVjdGVkSXRlbV8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogS2V5IGhhbmRsZXIgZm9yIHRoZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlS2V5ZG93biA9IGZ1bmN0aW9uIChldnQsIGlzUm9vdExpc3RJdGVtLCBsaXN0SXRlbUluZGV4KSB7XHJcbiAgICAgICAgdmFyIGlzQXJyb3dMZWZ0ID0gZXZ0LmtleSA9PT0gJ0Fycm93TGVmdCcgfHwgZXZ0LmtleUNvZGUgPT09IDM3O1xyXG4gICAgICAgIHZhciBpc0Fycm93VXAgPSBldnQua2V5ID09PSAnQXJyb3dVcCcgfHwgZXZ0LmtleUNvZGUgPT09IDM4O1xyXG4gICAgICAgIHZhciBpc0Fycm93UmlnaHQgPSBldnQua2V5ID09PSAnQXJyb3dSaWdodCcgfHwgZXZ0LmtleUNvZGUgPT09IDM5O1xyXG4gICAgICAgIHZhciBpc0Fycm93RG93biA9IGV2dC5rZXkgPT09ICdBcnJvd0Rvd24nIHx8IGV2dC5rZXlDb2RlID09PSA0MDtcclxuICAgICAgICB2YXIgaXNIb21lID0gZXZ0LmtleSA9PT0gJ0hvbWUnIHx8IGV2dC5rZXlDb2RlID09PSAzNjtcclxuICAgICAgICB2YXIgaXNFbmQgPSBldnQua2V5ID09PSAnRW5kJyB8fCBldnQua2V5Q29kZSA9PT0gMzU7XHJcbiAgICAgICAgdmFyIGlzRW50ZXIgPSBldnQua2V5ID09PSAnRW50ZXInIHx8IGV2dC5rZXlDb2RlID09PSAxMztcclxuICAgICAgICB2YXIgaXNTcGFjZSA9IGV2dC5rZXkgPT09ICdTcGFjZScgfHwgZXZ0LmtleUNvZGUgPT09IDMyO1xyXG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzUm9vdEZvY3VzZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAoaXNBcnJvd1VwIHx8IGlzRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNMYXN0RWxlbWVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyb3dEb3duIHx8IGlzSG9tZSkge1xyXG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzRmlyc3RFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRGb2N1c2VkRWxlbWVudEluZGV4KCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gbGlzdEl0ZW1JbmRleDtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgZXZlbnQgZG9lc24ndCBoYXZlIGEgbWRjLWxpc3QtaXRlbSBhbmNlc3RvciBmcm9tIHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gY3VycmVudCBsaXN0IChub3QgZnJvbSBhIHN1Ymxpc3QpLCByZXR1cm4gZWFybHkuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5leHRJbmRleDtcclxuICAgICAgICBpZiAoKHRoaXMuaXNWZXJ0aWNhbF8gJiYgaXNBcnJvd0Rvd24pIHx8ICghdGhpcy5pc1ZlcnRpY2FsXyAmJiBpc0Fycm93UmlnaHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmVudERlZmF1bHRFdmVudF8oZXZ0KTtcclxuICAgICAgICAgICAgbmV4dEluZGV4ID0gdGhpcy5mb2N1c05leHRFbGVtZW50KGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCh0aGlzLmlzVmVydGljYWxfICYmIGlzQXJyb3dVcCkgfHwgKCF0aGlzLmlzVmVydGljYWxfICYmIGlzQXJyb3dMZWZ0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnREZWZhdWx0RXZlbnRfKGV2dCk7XHJcbiAgICAgICAgICAgIG5leHRJbmRleCA9IHRoaXMuZm9jdXNQcmV2RWxlbWVudChjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc0hvbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50RGVmYXVsdEV2ZW50XyhldnQpO1xyXG4gICAgICAgICAgICBuZXh0SW5kZXggPSB0aGlzLmZvY3VzRmlyc3RFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmVudERlZmF1bHRFdmVudF8oZXZ0KTtcclxuICAgICAgICAgICAgbmV4dEluZGV4ID0gdGhpcy5mb2N1c0xhc3RFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzRW50ZXIgfHwgaXNTcGFjZSkge1xyXG4gICAgICAgICAgICBpZiAoaXNSb290TGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiBlYXJseSBpZiBlbnRlciBrZXkgaXMgcHJlc3NlZCBvbiBhbmNob3IgZWxlbWVudCB3aGljaCB0cmlnZ2VycyBzeW50aGV0aWMgTW91c2VFdmVudCBldmVudC5cclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQudGFnTmFtZSA9PT0gJ0EnICYmIGlzRW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnREZWZhdWx0RXZlbnRfKGV2dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGFibGVMaXN0XygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZEluZGV4T25BY3Rpb25fKGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLm5vdGlmeUFjdGlvbihjdXJyZW50SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmRleF8gPSBjdXJyZW50SW5kZXg7XHJcbiAgICAgICAgaWYgKG5leHRJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFiaW5kZXhBdEluZGV4XyhuZXh0SW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5kZXhfID0gbmV4dEluZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsaWNrIGhhbmRsZXIgZm9yIHRoZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoaW5kZXgsIHRvZ2dsZUNoZWNrYm94KSB7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSBudW1iZXJzLlVOU0VUX0lOREVYKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RhYmxlTGlzdF8oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXhPbkFjdGlvbl8oaW5kZXgsIHRvZ2dsZUNoZWNrYm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlBY3Rpb24oaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2V0VGFiaW5kZXhBdEluZGV4XyhpbmRleCk7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZGV4XyA9IGluZGV4O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRm9jdXNlcyB0aGUgbmV4dCBlbGVtZW50IG9uIHRoZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuZm9jdXNOZXh0RWxlbWVudCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBjb3VudCA9IHRoaXMuYWRhcHRlcl8uZ2V0TGlzdEl0ZW1Db3VudCgpO1xyXG4gICAgICAgIHZhciBuZXh0SW5kZXggPSBpbmRleCArIDE7XHJcbiAgICAgICAgaWYgKG5leHRJbmRleCA+PSBjb3VudCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53cmFwRm9jdXNfKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIGVhcmx5IGJlY2F1c2UgbGFzdCBpdGVtIGlzIGFscmVhZHkgZm9jdXNlZC5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmZvY3VzSXRlbUF0SW5kZXgobmV4dEluZGV4KTtcclxuICAgICAgICByZXR1cm4gbmV4dEluZGV4O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRm9jdXNlcyB0aGUgcHJldmlvdXMgZWxlbWVudCBvbiB0aGUgbGlzdC5cclxuICAgICAqL1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLmZvY3VzUHJldkVsZW1lbnQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICB2YXIgcHJldkluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgICAgIGlmIChwcmV2SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLndyYXBGb2N1c18pIHtcclxuICAgICAgICAgICAgICAgIHByZXZJbmRleCA9IHRoaXMuYWRhcHRlcl8uZ2V0TGlzdEl0ZW1Db3VudCgpIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiBlYXJseSBiZWNhdXNlIGZpcnN0IGl0ZW0gaXMgYWxyZWFkeSBmb2N1c2VkLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChwcmV2SW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBwcmV2SW5kZXg7XHJcbiAgICB9O1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLmZvY3VzRmlyc3RFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleCgwKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuZm9jdXNMYXN0RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbGFzdEluZGV4ID0gdGhpcy5hZGFwdGVyXy5nZXRMaXN0SXRlbUNvdW50KCkgLSAxO1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZm9jdXNJdGVtQXRJbmRleChsYXN0SW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBsYXN0SW5kZXg7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbnN1cmVzIHRoYXQgcHJldmVudERlZmF1bHQgaXMgb25seSBjYWxsZWQgaWYgdGhlIGNvbnRhaW5pbmcgZWxlbWVudCBkb2Vzbid0XHJcbiAgICAgKiBjb25zdW1lIHRoZSBldmVudCwgYW5kIGl0IHdpbGwgY2F1c2UgYW4gdW5pbnRlbmRlZCBzY3JvbGwuXHJcbiAgICAgKi9cclxuICAgIE1EQ0xpc3RGb3VuZGF0aW9uLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdEV2ZW50XyA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcclxuICAgICAgICB2YXIgdGFnTmFtZSA9IChcIlwiICsgdGFyZ2V0LnRhZ05hbWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKEVMRU1FTlRTX0tFWV9BTExPV0VEX0lOLmluZGV4T2YodGFnTmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0U2luZ2xlU2VsZWN0aW9uQXRJbmRleF8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyA9PT0gaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZWN0ZWRDbGFzc05hbWUgPSBjc3NDbGFzc2VzLkxJU1RfSVRFTV9TRUxFQ1RFRF9DTEFTUztcclxuICAgICAgICBpZiAodGhpcy51c2VBY3RpdmF0ZWRDbGFzc18pIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRDbGFzc05hbWUgPSBjc3NDbGFzc2VzLkxJU1RfSVRFTV9BQ1RJVkFURURfQ0xBU1M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfICE9PSBudW1iZXJzLlVOU0VUX0lOREVYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3NGb3JFbGVtZW50SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4Xywgc2VsZWN0ZWRDbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzRm9yRWxlbWVudEluZGV4KGluZGV4LCBzZWxlY3RlZENsYXNzTmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBcmlhRm9yU2luZ2xlU2VsZWN0aW9uQXRJbmRleF8oaW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSBpbmRleDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgYXJpYSBhdHRyaWJ1dGUgZm9yIHNpbmdsZSBzZWxlY3Rpb24gYXQgZ2l2ZW4gaW5kZXguXHJcbiAgICAgKi9cclxuICAgIE1EQ0xpc3RGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRBcmlhRm9yU2luZ2xlU2VsZWN0aW9uQXRJbmRleF8gPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAvLyBEZXRlY3QgdGhlIHByZXNlbmNlIG9mIGFyaWEtY3VycmVudCBhbmQgZ2V0IHRoZSB2YWx1ZSBvbmx5IGR1cmluZyBsaXN0IGluaXRpYWxpemF0aW9uIHdoZW4gaXQgaXMgaW4gdW5zZXQgc3RhdGUuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleF8gPT09IG51bWJlcnMuVU5TRVRfSU5ERVgpIHtcclxuICAgICAgICAgICAgdGhpcy5hcmlhQ3VycmVudEF0dHJWYWx1ZV8gPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXgoaW5kZXgsIHN0cmluZ3MuQVJJQV9DVVJSRU5UKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlzQXJpYUN1cnJlbnQgPSB0aGlzLmFyaWFDdXJyZW50QXR0clZhbHVlXyAhPT0gbnVsbDtcclxuICAgICAgICB2YXIgYXJpYUF0dHJpYnV0ZSA9IGlzQXJpYUN1cnJlbnQgPyBzdHJpbmdzLkFSSUFfQ1VSUkVOVCA6IHN0cmluZ3MuQVJJQV9TRUxFQ1RFRDtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4XyAhPT0gbnVtYmVycy5VTlNFVF9JTkRFWCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXhfLCBhcmlhQXR0cmlidXRlLCAnZmFsc2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFyaWFBdHRyaWJ1dGVWYWx1ZSA9IGlzQXJpYUN1cnJlbnQgPyB0aGlzLmFyaWFDdXJyZW50QXR0clZhbHVlXyA6ICd0cnVlJztcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgYXJpYUF0dHJpYnV0ZSwgYXJpYUF0dHJpYnV0ZVZhbHVlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgcmFkaW8gYXQgZ2l2ZSBpbmRleC4gUmFkaW8gZG9lc24ndCBjaGFuZ2UgdGhlIGNoZWNrZWQgc3RhdGUgaWYgaXQgaXMgYWxyZWFkeSBjaGVja2VkLlxyXG4gICAgICovXHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0UmFkaW9BdEluZGV4XyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0Q2hlY2tlZENoZWNrYm94T3JSYWRpb0F0SW5kZXgoaW5kZXgsIHRydWUpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXhfICE9PSBudW1iZXJzLlVOU0VUX0lOREVYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleF8sIHN0cmluZ3MuQVJJQV9DSEVDS0VELCAnZmFsc2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRBdHRyaWJ1dGVGb3JFbGVtZW50SW5kZXgoaW5kZXgsIHN0cmluZ3MuQVJJQV9DSEVDS0VELCAndHJ1ZScpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSBpbmRleDtcclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0Q2hlY2tib3hBdEluZGV4XyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hZGFwdGVyXy5nZXRMaXN0SXRlbUNvdW50KCk7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChpbmRleC5pbmRleE9mKGkpID49IDApIHtcclxuICAgICAgICAgICAgICAgIGlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRDaGVja2VkQ2hlY2tib3hPclJhZGlvQXRJbmRleChpLCBpc0NoZWNrZWQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpLCBzdHJpbmdzLkFSSUFfQ0hFQ0tFRCwgaXNDaGVja2VkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleF8gPSBpbmRleDtcclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0VGFiaW5kZXhBdEluZGV4XyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5kZXhfID09PSBudW1iZXJzLlVOU0VUX0lOREVYICYmIGluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIGxpc3QgaXRlbSB3YXMgc2VsZWN0ZWQgc2V0IGZpcnN0IGxpc3QgaXRlbSdzIHRhYmluZGV4IHRvIC0xLlxyXG4gICAgICAgICAgICAvLyBHZW5lcmFsbHksIHRhYmluZGV4IGlzIHNldCB0byAwIG9uIGZpcnN0IGxpc3QgaXRlbSBvZiBsaXN0IHRoYXQgaGFzIG5vIHByZXNlbGVjdGVkIGl0ZW1zLlxyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleCgwLCAndGFiaW5kZXgnLCAnLTEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5mb2N1c2VkSXRlbUluZGV4XyA+PSAwICYmIHRoaXMuZm9jdXNlZEl0ZW1JbmRleF8gIT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8uc2V0QXR0cmlidXRlRm9yRWxlbWVudEluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmRleF8sICd0YWJpbmRleCcsICctMScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgJ3RhYmluZGV4JywgJzAnKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm4gUmV0dXJuIHRydWUgaWYgaXQgaXMgc2luZ2xlIHNlbGVjdGluIGxpc3QsIGNoZWNrYm94IGxpc3Qgb3IgcmFkaW8gbGlzdC5cclxuICAgICAqL1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLmlzU2VsZWN0YWJsZUxpc3RfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTGlzdF8gfHwgdGhpcy5pc0NoZWNrYm94TGlzdF8gfHwgdGhpcy5pc1JhZGlvTGlzdF87XHJcbiAgICB9O1xyXG4gICAgTURDTGlzdEZvdW5kYXRpb24ucHJvdG90eXBlLnNldFRhYmluZGV4VG9GaXJzdFNlbGVjdGVkSXRlbV8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldEluZGV4ID0gMDtcclxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGFibGVMaXN0XygpKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZWxlY3RlZEluZGV4XyA9PT0gJ251bWJlcicgJiYgdGhpcy5zZWxlY3RlZEluZGV4XyAhPT0gbnVtYmVycy5VTlNFVF9JTkRFWCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXhfO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlzTnVtYmVyQXJyYXkodGhpcy5zZWxlY3RlZEluZGV4XykgJiYgdGhpcy5zZWxlY3RlZEluZGV4Xy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleF8ucmVkdWNlKGZ1bmN0aW9uIChjdXJyZW50SW5kZXgsIG1pbkluZGV4KSB7IHJldHVybiBNYXRoLm1pbihjdXJyZW50SW5kZXgsIG1pbkluZGV4KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRUYWJpbmRleEF0SW5kZXhfKHRhcmdldEluZGV4KTtcclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuaXNJbmRleFZhbGlkXyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGluZGV4IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ2hlY2tib3hMaXN0Xykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNRENMaXN0Rm91bmRhdGlvbjogQXJyYXkgb2YgaW5kZXggaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNoZWNrYm94IGJhc2VkIGxpc3QnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5kZXgubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleC5zb21lKGZ1bmN0aW9uIChpKSB7IHJldHVybiBfdGhpcy5pc0luZGV4SW5SYW5nZV8oaSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDaGVja2JveExpc3RfKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01EQ0xpc3RGb3VuZGF0aW9uOiBFeHBlY3RlZCBhcnJheSBvZiBpbmRleCBmb3IgY2hlY2tib3ggYmFzZWQgbGlzdCBidXQgZ290IG51bWJlcjogJyArIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0luZGV4SW5SYW5nZV8oaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuaXNJbmRleEluUmFuZ2VfID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgdmFyIGxpc3RTaXplID0gdGhpcy5hZGFwdGVyXy5nZXRMaXN0SXRlbUNvdW50KCk7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPCBsaXN0U2l6ZTtcclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUuc2V0U2VsZWN0ZWRJbmRleE9uQWN0aW9uXyA9IGZ1bmN0aW9uIChpbmRleCwgdG9nZ2xlQ2hlY2tib3gpIHtcclxuICAgICAgICBpZiAodG9nZ2xlQ2hlY2tib3ggPT09IHZvaWQgMCkgeyB0b2dnbGVDaGVja2JveCA9IHRydWU7IH1cclxuICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94TGlzdF8pIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVDaGVja2JveEF0SW5kZXhfKGluZGV4LCB0b2dnbGVDaGVja2JveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNRENMaXN0Rm91bmRhdGlvbi5wcm90b3R5cGUudG9nZ2xlQ2hlY2tib3hBdEluZGV4XyA9IGZ1bmN0aW9uIChpbmRleCwgdG9nZ2xlQ2hlY2tib3gpIHtcclxuICAgICAgICB2YXIgaXNDaGVja2VkID0gdGhpcy5hZGFwdGVyXy5pc0NoZWNrYm94Q2hlY2tlZEF0SW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIGlmICh0b2dnbGVDaGVja2JveCkge1xyXG4gICAgICAgICAgICBpc0NoZWNrZWQgPSAhaXNDaGVja2VkO1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldENoZWNrZWRDaGVja2JveE9yUmFkaW9BdEluZGV4KGluZGV4LCBpc0NoZWNrZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldEF0dHJpYnV0ZUZvckVsZW1lbnRJbmRleChpbmRleCwgc3RyaW5ncy5BUklBX0NIRUNLRUQsIGlzQ2hlY2tlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xyXG4gICAgICAgIC8vIElmIG5vbmUgb2YgdGhlIGNoZWNrYm94IGl0ZW1zIGFyZSBzZWxlY3RlZCBhbmQgc2VsZWN0ZWRJbmRleCBpcyBub3QgaW5pdGlhbGl6ZWQgdGhlbiBwcm92aWRlIGEgZGVmYXVsdCB2YWx1ZS5cclxuICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleGVzID0gdGhpcy5zZWxlY3RlZEluZGV4XyA9PT0gbnVtYmVycy5VTlNFVF9JTkRFWCA/IFtdIDogdGhpcy5zZWxlY3RlZEluZGV4Xy5zbGljZSgpO1xyXG4gICAgICAgIGlmIChpc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRJbmRleGVzLnB1c2goaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRJbmRleGVzID0gc2VsZWN0ZWRJbmRleGVzLmZpbHRlcihmdW5jdGlvbiAoaSkgeyByZXR1cm4gaSAhPT0gaW5kZXg7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXhfID0gc2VsZWN0ZWRJbmRleGVzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNRENMaXN0Rm91bmRhdGlvbjtcclxufShNRENGb3VuZGF0aW9uKSk7XHJcbmV4cG9ydCB7IE1EQ0xpc3RGb3VuZGF0aW9uIH07XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXHJcbmV4cG9ydCBkZWZhdWx0IE1EQ0xpc3RGb3VuZGF0aW9uO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBNRENDb21wb25lbnQgfSBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBhcHBseVBhc3NpdmUgfSBmcm9tICdAbWF0ZXJpYWwvZG9tL2V2ZW50cyc7XHJcbmltcG9ydCB7IG1hdGNoZXMgfSBmcm9tICdAbWF0ZXJpYWwvZG9tL3BvbnlmaWxsJztcclxuaW1wb3J0IHsgTURDUmlwcGxlRm91bmRhdGlvbiB9IGZyb20gJy4vZm91bmRhdGlvbic7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcclxudmFyIE1EQ1JpcHBsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKE1EQ1JpcHBsZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE1EQ1JpcHBsZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIE1EQ1JpcHBsZS5hdHRhY2hUbyA9IGZ1bmN0aW9uIChyb290LCBvcHRzKSB7XHJcbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0geyBpc1VuYm91bmRlZDogdW5kZWZpbmVkIH07IH1cclxuICAgICAgICB2YXIgcmlwcGxlID0gbmV3IE1EQ1JpcHBsZShyb290KTtcclxuICAgICAgICAvLyBPbmx5IG92ZXJyaWRlIHVuYm91bmRlZCBiZWhhdmlvciBpZiBvcHRpb24gaXMgZXhwbGljaXRseSBzcGVjaWZpZWRcclxuICAgICAgICBpZiAob3B0cy5pc1VuYm91bmRlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSBvcHRzLmlzVW5ib3VuZGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmlwcGxlO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWRkQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHsgcmV0dXJuIGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfSxcclxuICAgICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXRpbC5zdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpOyB9LFxyXG4gICAgICAgICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBpbnN0YW5jZS5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgfSxcclxuICAgICAgICAgICAgY29udGFpbnNFdmVudFRhcmdldDogZnVuY3Rpb24gKHRhcmdldCkgeyByZXR1cm4gaW5zdGFuY2Uucm9vdF8uY29udGFpbnModGFyZ2V0KTsgfSxcclxuICAgICAgICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoZXZ0VHlwZSwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogZnVuY3Rpb24gKGV2dFR5cGUsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIGFwcGx5UGFzc2l2ZSgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcik7IH0sXHJcbiAgICAgICAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IHg6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0IH0pOyB9LFxyXG4gICAgICAgICAgICBpc1N1cmZhY2VBY3RpdmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGNoZXMoaW5zdGFuY2Uucm9vdF8sICc6YWN0aXZlJyk7IH0sXHJcbiAgICAgICAgICAgIGlzU3VyZmFjZURpc2FibGVkOiBmdW5jdGlvbiAoKSB7IHJldHVybiBCb29sZWFuKGluc3RhbmNlLmRpc2FibGVkKTsgfSxcclxuICAgICAgICAgICAgaXNVbmJvdW5kZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEJvb2xlYW4oaW5zdGFuY2UudW5ib3VuZGVkKTsgfSxcclxuICAgICAgICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogZnVuY3Rpb24gKGV2dFR5cGUsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCBhcHBseVBhc3NpdmUoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoZXZ0VHlwZSwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgYXBwbHlQYXNzaXZlKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uIChoYW5kbGVyKSB7IHJldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlcik7IH0sXHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7IHJldHVybiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7IH0sXHJcbiAgICAgICAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiBmdW5jdGlvbiAodmFyTmFtZSwgdmFsdWUpIHsgcmV0dXJuIGluc3RhbmNlLnJvb3RfLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhbHVlKTsgfSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENSaXBwbGUucHJvdG90eXBlLCBcInVuYm91bmRlZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMudW5ib3VuZGVkXyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh1bmJvdW5kZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51bmJvdW5kZWRfID0gQm9vbGVhbih1bmJvdW5kZWQpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFVuYm91bmRlZF8oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE1EQ1JpcHBsZS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5hY3RpdmF0ZSgpO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZS5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb25fLmRlYWN0aXZhdGUoKTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGUucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZvdW5kYXRpb25fLmxheW91dCgpO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZS5wcm90b3R5cGUuZ2V0RGVmYXVsdEZvdW5kYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpKTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGUucHJvdG90eXBlLmluaXRpYWxTeW5jV2l0aERPTSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMucm9vdF87XHJcbiAgICAgICAgdGhpcy51bmJvdW5kZWQgPSAnbWRjUmlwcGxlSXNVbmJvdW5kZWQnIGluIHJvb3QuZGF0YXNldDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENsb3N1cmUgQ29tcGlsZXIgdGhyb3dzIGFuIGFjY2VzcyBjb250cm9sIGVycm9yIHdoZW4gZGlyZWN0bHkgYWNjZXNzaW5nIGFcclxuICAgICAqIHByb3RlY3RlZCBvciBwcml2YXRlIHByb3BlcnR5IGluc2lkZSBhIGdldHRlci9zZXR0ZXIsIGxpa2UgdW5ib3VuZGVkIGFib3ZlLlxyXG4gICAgICogQnkgYWNjZXNzaW5nIHRoZSBwcm90ZWN0ZWQgcHJvcGVydHkgaW5zaWRlIGEgbWV0aG9kLCB3ZSBzb2x2ZSB0aGF0IHByb2JsZW0uXHJcbiAgICAgKiBUaGF0J3Mgd2h5IHRoaXMgZnVuY3Rpb24gZXhpc3RzLlxyXG4gICAgICovXHJcbiAgICBNRENSaXBwbGUucHJvdG90eXBlLnNldFVuYm91bmRlZF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRVbmJvdW5kZWQoQm9vbGVhbih0aGlzLnVuYm91bmRlZF8pKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTURDUmlwcGxlO1xyXG59KE1EQ0NvbXBvbmVudCkpO1xyXG5leHBvcnQgeyBNRENSaXBwbGUgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50LmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5leHBvcnQgdmFyIGNzc0NsYXNzZXMgPSB7XHJcbiAgICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXHJcbiAgICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XHJcbiAgICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXHJcbiAgICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcclxuICAgIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxyXG4gICAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxyXG4gICAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxyXG4gICAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcclxufTtcclxuZXhwb3J0IHZhciBzdHJpbmdzID0ge1xyXG4gICAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcclxuICAgIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxyXG4gICAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXHJcbiAgICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXHJcbiAgICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcclxuICAgIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcclxufTtcclxuZXhwb3J0IHZhciBudW1iZXJzID0ge1xyXG4gICAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSxcclxuICAgIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLFxyXG4gICAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcclxuICAgIFBBRERJTkc6IDEwLFxyXG4gICAgVEFQX0RFTEFZX01TOiAzMDAsXHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgTURDRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBjc3NDbGFzc2VzLCBudW1iZXJzLCBzdHJpbmdzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMgfSBmcm9tICcuL3V0aWwnO1xyXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxyXG52YXIgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFtcclxuICAgICd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJyxcclxuXTtcclxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXHJcbnZhciBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFtcclxuICAgICd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCcsICdjb250ZXh0bWVudScsXHJcbl07XHJcbi8vIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcclxudmFyIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcclxudmFyIE1EQ1JpcHBsZUZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhNRENSaXBwbGVGb3VuZGF0aW9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTURDUmlwcGxlRm91bmRhdGlvbihhZGFwdGVyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdHNsaWJfMS5fX2Fzc2lnbih7fSwgTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIF90aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xyXG4gICAgICAgIF90aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XHJcbiAgICAgICAgX3RoaXMuZmdTY2FsZV8gPSAnMCc7XHJcbiAgICAgICAgX3RoaXMuZnJhbWVfID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH07XHJcbiAgICAgICAgX3RoaXMuaW5pdGlhbFNpemVfID0gMDtcclxuICAgICAgICBfdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xyXG4gICAgICAgIF90aGlzLm1heFJhZGl1c18gPSAwO1xyXG4gICAgICAgIF90aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7IGxlZnQ6IDAsIHRvcDogMCB9O1xyXG4gICAgICAgIF90aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSBfdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xyXG4gICAgICAgIF90aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3RoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XHJcbiAgICAgICAgICAgIF90aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgX3RoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5hY3RpdmF0ZV8oZSk7IH07XHJcbiAgICAgICAgX3RoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuZGVhY3RpdmF0ZV8oKTsgfTtcclxuICAgICAgICBfdGhpcy5mb2N1c0hhbmRsZXJfID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuaGFuZGxlRm9jdXMoKTsgfTtcclxuICAgICAgICBfdGhpcy5ibHVySGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5oYW5kbGVCbHVyKCk7IH07XHJcbiAgICAgICAgX3RoaXMucmVzaXplSGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5sYXlvdXQoKTsgfTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDUmlwcGxlRm91bmRhdGlvbiwgXCJjc3NDbGFzc2VzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNzc0NsYXNzZXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDUmlwcGxlRm91bmRhdGlvbiwgXCJzdHJpbmdzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDUmlwcGxlRm91bmRhdGlvbiwgXCJudW1iZXJzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bWJlcnM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDUmlwcGxlRm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7IHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9KTsgfSxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgICAgICAgICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiAoeyB4OiAwLCB5OiAwIH0pOyB9LFxyXG4gICAgICAgICAgICAgICAgaXNTdXJmYWNlQWN0aXZlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9LFxyXG4gICAgICAgICAgICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH0sXHJcbiAgICAgICAgICAgICAgICBpc1VuYm91bmRlZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDc3NWYXJpYWJsZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzdXBwb3J0c1ByZXNzUmlwcGxlID0gdGhpcy5zdXBwb3J0c1ByZXNzUmlwcGxlXygpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKHN1cHBvcnRzUHJlc3NSaXBwbGUpO1xyXG4gICAgICAgIGlmIChzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XHJcbiAgICAgICAgICAgIHZhciBfYSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcywgUk9PVF8xID0gX2EuUk9PVCwgVU5CT1VOREVEXzEgPSBfYS5VTkJPVU5ERUQ7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UXzEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERURfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmxheW91dEludGVybmFsXygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLnN1cHBvcnRzUHJlc3NSaXBwbGVfKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkdfQUNUSVZBVElPTik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkdfREVBQ1RJVkFUSU9OKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgX2EgPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMsIFJPT1RfMiA9IF9hLlJPT1QsIFVOQk9VTkRFRF8yID0gX2EuVU5CT1VOREVEO1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVF8yKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRF8yKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XHJcbiAgICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gZXZ0IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXHJcbiAgICAgKi9cclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZhdGVfKGV2dCk7XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVfKCk7XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XHJcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcclxuICAgICAgICAgICAgX3RoaXMubGF5b3V0RnJhbWVfID0gMDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5zZXRVbmJvdW5kZWQgPSBmdW5jdGlvbiAodW5ib3VuZGVkKSB7XHJcbiAgICAgICAgdmFyIFVOQk9VTkRFRCA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5VTkJPVU5ERUQ7XHJcbiAgICAgICAgaWYgKHVuYm91bmRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZUZvY3VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVCbHVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxyXG4gICAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXHJcbiAgICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cclxuICAgICAqL1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuc3VwcG9ydHNQcmVzc1JpcHBsZV8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjdGl2YXRpb25FdmVudDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxyXG4gICAgICAgICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIHN1cHBvcnRzUHJlc3NSaXBwbGUgUGFzc2VkIGZyb20gaW5pdCB0byBzYXZlIGEgcmVkdW5kYW50IGZ1bmN0aW9uIGNhbGxcclxuICAgICAqL1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUucmVnaXN0ZXJSb290SGFuZGxlcnNfID0gZnVuY3Rpb24gKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XHJcbiAgICAgICAgICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAoZXZ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgX3RoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChldnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaChmdW5jdGlvbiAoZXZ0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goZnVuY3Rpb24gKGV2dFR5cGUpIHtcclxuICAgICAgICAgICAgX3RoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcclxuICAgICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKGZ1bmN0aW9uIChldnRUeXBlKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBfdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLnJlbW92ZUNzc1ZhcnNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHJpcHBsZVN0cmluZ3MgPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyaXBwbGVTdHJpbmdzKTtcclxuICAgICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5LmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUocmlwcGxlU3RyaW5nc1trZXldLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmFjdGl2YXRlXyA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xyXG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXHJcbiAgICAgICAgdmFyIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XHJcbiAgICAgICAgdmFyIGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZXZ0ICE9PSB1bmRlZmluZWQgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZXZ0LnR5cGU7XHJcbiAgICAgICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcclxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBldnQgPT09IHVuZGVmaW5lZDtcclxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZXZ0O1xyXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IGV2dCAhPT0gdW5kZWZpbmVkICYmIChldnQudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZXZ0LnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBldnQudHlwZSA9PT0gJ3BvaW50ZXJkb3duJyk7XHJcbiAgICAgICAgdmFyIGhhc0FjdGl2YXRlZENoaWxkID0gZXZ0ICE9PSB1bmRlZmluZWQgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZShmdW5jdGlvbiAodGFyZ2V0KSB7IHJldHVybiBfdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCk7IH0pO1xyXG4gICAgICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xyXG4gICAgICAgICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChldnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goZXZ0LnRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZXZ0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhldnQpO1xyXG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcclxuICAgICAgICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgJiYgZXZ0ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICYmIChldnQua2V5ID09PSAnICcgfHwgZXZ0LmtleUNvZGUgPT09IDMyKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcclxuICAgICAgICAgICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcclxuICAgICAgICAgICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXHJcbiAgICAgICAgICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcclxuICAgICAgICAgICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xyXG4gICAgICAgICAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXHJcbiAgICAgICAgICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSBfdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhldnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSBfdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8gPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgcmV0dXJuIChldnQgIT09IHVuZGVmaW5lZCAmJiBldnQudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmFuaW1hdGVBY3RpdmF0aW9uXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBfYSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncywgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCA9IF9hLlZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EID0gX2EuVkFSX0ZHX1RSQU5TTEFURV9FTkQ7XHJcbiAgICAgICAgdmFyIF9iID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLCBGR19ERUFDVElWQVRJT04gPSBfYi5GR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT04gPSBfYi5GR19BQ1RJVkFUSU9OO1xyXG4gICAgICAgIHZhciBERUFDVElWQVRJT05fVElNRU9VVF9NUyA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5ERUFDVElWQVRJT05fVElNRU9VVF9NUztcclxuICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xyXG4gICAgICAgIHZhciB0cmFuc2xhdGVTdGFydCA9ICcnO1xyXG4gICAgICAgIHZhciB0cmFuc2xhdGVFbmQgPSAnJztcclxuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xyXG4gICAgICAgICAgICB2YXIgX2MgPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSwgc3RhcnRQb2ludCA9IF9jLnN0YXJ0UG9pbnQsIGVuZFBvaW50ID0gX2MuZW5kUG9pbnQ7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gc3RhcnRQb2ludC54ICsgXCJweCwgXCIgKyBzdGFydFBvaW50LnkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZUVuZCA9IGVuZFBvaW50LnggKyBcInB4LCBcIiArIGVuZFBvaW50LnkgKyBcInB4XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XHJcbiAgICAgICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xyXG4gICAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xyXG4gICAgICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpOyB9LCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8sIGFjdGl2YXRpb25FdmVudCA9IF9hLmFjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyID0gX2Eud2FzQWN0aXZhdGVkQnlQb2ludGVyO1xyXG4gICAgICAgIHZhciBzdGFydFBvaW50O1xyXG4gICAgICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcclxuICAgICAgICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhhY3RpdmF0aW9uRXZlbnQsIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzdGFydFBvaW50ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXHJcbiAgICAgICAgc3RhcnRQb2ludCA9IHtcclxuICAgICAgICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXHJcbiAgICAgICAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGVuZFBvaW50ID0ge1xyXG4gICAgICAgICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxyXG4gICAgICAgICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB7IHN0YXJ0UG9pbnQ6IHN0YXJ0UG9pbnQsIGVuZFBvaW50OiBlbmRQb2ludCB9O1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxyXG4gICAgICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxyXG4gICAgICAgIHZhciBGR19ERUFDVElWQVRJT04gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkdfREVBQ1RJVkFUSU9OO1xyXG4gICAgICAgIHZhciBfYSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXywgaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSBfYS5oYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWQgPSBfYS5pc0FjdGl2YXRlZDtcclxuICAgICAgICB2YXIgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xyXG4gICAgICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcclxuICAgICAgICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XHJcbiAgICAgICAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTURDUmlwcGxlRm91bmRhdGlvbi5wcm90b3R5cGUucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBGR19BQ1RJVkFUSU9OID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZHX0FDVElWQVRJT047XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5yZXNldEFjdGl2YXRpb25TdGF0ZV8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xyXG4gICAgICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXHJcbiAgICAgICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB1bmRlZmluZWQ7IH0sIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xyXG4gICAgfTtcclxuICAgIE1EQ1JpcHBsZUZvdW5kYXRpb24ucHJvdG90eXBlLmRlYWN0aXZhdGVfID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcclxuICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXHJcbiAgICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhdGUgPSB0c2xpYl8xLl9fYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpO1xyXG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKHN0YXRlKTsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5hbmltYXRlRGVhY3RpdmF0aW9uXyA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgIHZhciB3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBfYS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlID0gX2Eud2FzRWxlbWVudE1hZGVBY3RpdmU7XHJcbiAgICAgICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS5sYXlvdXRJbnRlcm5hbF8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xyXG4gICAgICAgIHZhciBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcclxuICAgICAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxyXG4gICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcclxuICAgICAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxyXG4gICAgICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxyXG4gICAgICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcclxuICAgICAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXHJcbiAgICAgICAgdmFyIGdldEJvdW5kZWRSYWRpdXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KF90aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyhfdGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XHJcbiAgICAgICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cclxuICAgICAgICB0aGlzLmluaXRpYWxTaXplXyA9IE1hdGguZmxvb3IobWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFKTtcclxuICAgICAgICB0aGlzLmZnU2NhbGVfID0gXCJcIiArIHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcclxuICAgIH07XHJcbiAgICBNRENSaXBwbGVGb3VuZGF0aW9uLnByb3RvdHlwZS51cGRhdGVMYXlvdXRDc3NWYXJzXyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EgPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3MsIFZBUl9GR19TSVpFID0gX2EuVkFSX0ZHX1NJWkUsIFZBUl9MRUZUID0gX2EuVkFSX0xFRlQsIFZBUl9UT1AgPSBfYS5WQVJfVE9QLCBWQVJfRkdfU0NBTEUgPSBfYS5WQVJfRkdfU0NBTEU7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgdGhpcy5pbml0aWFsU2l6ZV8gKyBcInB4XCIpO1xyXG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcclxuICAgICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcclxuICAgICAgICAgICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXHJcbiAgICAgICAgICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCB0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdCArIFwicHhcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgdGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcCArIFwicHhcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBNRENSaXBwbGVGb3VuZGF0aW9uO1xyXG59KE1EQ0ZvdW5kYXRpb24pKTtcclxuZXhwb3J0IHsgTURDUmlwcGxlRm91bmRhdGlvbiB9O1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVmYXVsdC1leHBvcnQgTmVlZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggTURDIFdlYiB2MC40NC4wIGFuZCBlYXJsaWVyLlxyXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3VuZGF0aW9uLmpzLm1hcCIsIi8qKlxyXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG9cclxuICogZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cclxuICovXHJcbnZhciBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XHJcbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XHJcbiAgICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcclxuICAgIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXHJcbiAgICB2YXIgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XHJcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXHJcbiAgICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxyXG4gICAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxyXG4gICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcclxuICAgIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcbiAgICB2YXIgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xyXG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoKSB7XHJcbiAgICBpZiAoZm9yY2VSZWZyZXNoID09PSB2b2lkIDApIHsgZm9yY2VSZWZyZXNoID0gZmFsc2U7IH1cclxuICAgIHZhciBDU1MgPSB3aW5kb3dPYmouQ1NTO1xyXG4gICAgdmFyIHN1cHBvcnRzQ3NzVmFycyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcclxuICAgIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XHJcbiAgICB9XHJcbiAgICB2YXIgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSBDU1MgJiYgdHlwZW9mIENTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IENTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcclxuICAgIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxyXG4gICAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcclxuICAgIHZhciB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXHJcbiAgICAgICAgQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKSk7XHJcbiAgICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcclxuICAgICAgICBzdXBwb3J0c0Nzc1ZhcnMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc3VwcG9ydHNDc3NWYXJzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoIWZvcmNlUmVmcmVzaCkge1xyXG4gICAgICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFycztcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcnM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldnQsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcclxuICAgIGlmICghZXZ0KSB7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xyXG4gICAgfVxyXG4gICAgdmFyIHggPSBwYWdlT2Zmc2V0LngsIHkgPSBwYWdlT2Zmc2V0Lnk7XHJcbiAgICB2YXIgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcclxuICAgIHZhciBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XHJcbiAgICB2YXIgbm9ybWFsaXplZFg7XHJcbiAgICB2YXIgbm9ybWFsaXplZFk7XHJcbiAgICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXHJcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG4gICAgICAgIHZhciB0b3VjaEV2ZW50ID0gZXZ0O1xyXG4gICAgICAgIG5vcm1hbGl6ZWRYID0gdG91Y2hFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcclxuICAgICAgICBub3JtYWxpemVkWSA9IHRvdWNoRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgbW91c2VFdmVudCA9IGV2dDtcclxuICAgICAgICBub3JtYWxpemVkWCA9IG1vdXNlRXZlbnQucGFnZVggLSBkb2N1bWVudFg7XHJcbiAgICAgICAgbm9ybWFsaXplZFkgPSBtb3VzZUV2ZW50LnBhZ2VZIC0gZG9jdW1lbnRZO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgeDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZIH07XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgTURDQ29tcG9uZW50IH0gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcclxuaW1wb3J0IHsgTURDUmlwcGxlIH0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBjc3NDbGFzc2VzLCBzdHJpbmdzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNRENGaXhlZFRvcEFwcEJhckZvdW5kYXRpb24gfSBmcm9tICcuL2ZpeGVkL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24gfSBmcm9tICcuL3Nob3J0L2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBNRENUb3BBcHBCYXJGb3VuZGF0aW9uIH0gZnJvbSAnLi9zdGFuZGFyZC9mb3VuZGF0aW9uJztcclxudmFyIE1EQ1RvcEFwcEJhciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKE1EQ1RvcEFwcEJhciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE1EQ1RvcEFwcEJhcigpIHtcclxuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XHJcbiAgICB9XHJcbiAgICBNRENUb3BBcHBCYXIuYXR0YWNoVG8gPSBmdW5jdGlvbiAocm9vdCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgTURDVG9wQXBwQmFyKHJvb3QpO1xyXG4gICAgfTtcclxuICAgIE1EQ1RvcEFwcEJhci5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChyaXBwbGVGYWN0b3J5KSB7XHJcbiAgICAgICAgaWYgKHJpcHBsZUZhY3RvcnkgPT09IHZvaWQgMCkgeyByaXBwbGVGYWN0b3J5ID0gZnVuY3Rpb24gKGVsKSB7IHJldHVybiBNRENSaXBwbGUuYXR0YWNoVG8oZWwpOyB9OyB9XHJcbiAgICAgICAgdGhpcy5uYXZJY29uXyA9IHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihzdHJpbmdzLk5BVklHQVRJT05fSUNPTl9TRUxFQ1RPUik7XHJcbiAgICAgICAgLy8gR2V0IGFsbCBpY29ucyBpbiB0aGUgdG9vbGJhciBhbmQgaW5zdGFudGlhdGUgdGhlIHJpcHBsZXNcclxuICAgICAgICB2YXIgaWNvbnMgPSBbXS5zbGljZS5jYWxsKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChzdHJpbmdzLkFDVElPTl9JVEVNX1NFTEVDVE9SKSk7XHJcbiAgICAgICAgaWYgKHRoaXMubmF2SWNvbl8pIHtcclxuICAgICAgICAgICAgaWNvbnMucHVzaCh0aGlzLm5hdkljb25fKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pY29uUmlwcGxlc18gPSBpY29ucy5tYXAoZnVuY3Rpb24gKGljb24pIHtcclxuICAgICAgICAgICAgdmFyIHJpcHBsZSA9IHJpcHBsZUZhY3RvcnkoaWNvbik7XHJcbiAgICAgICAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gcmlwcGxlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0XyA9IHdpbmRvdztcclxuICAgIH07XHJcbiAgICBNRENUb3BBcHBCYXIucHJvdG90eXBlLmluaXRpYWxTeW5jV2l0aERPTSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU5hdmlnYXRpb25DbGlja18gPSB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZU5hdmlnYXRpb25DbGljay5iaW5kKHRoaXMuZm91bmRhdGlvbl8pO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlV2luZG93UmVzaXplXyA9IHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlV2luZG93UmVzaXplLmJpbmQodGhpcy5mb3VuZGF0aW9uXyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUYXJnZXRTY3JvbGxfID0gdGhpcy5mb3VuZGF0aW9uXy5oYW5kbGVUYXJnZXRTY3JvbGwuYmluZCh0aGlzLmZvdW5kYXRpb25fKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldF8uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVUYXJnZXRTY3JvbGxfKTtcclxuICAgICAgICBpZiAodGhpcy5uYXZJY29uXykge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkljb25fLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVOYXZpZ2F0aW9uQ2xpY2tfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlzRml4ZWQgPSB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkZJWEVEX0NMQVNTKTtcclxuICAgICAgICB2YXIgaXNTaG9ydCA9IHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuU0hPUlRfQ0xBU1MpO1xyXG4gICAgICAgIGlmICghaXNTaG9ydCAmJiAhaXNGaXhlZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemVfKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTURDVG9wQXBwQmFyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaWNvblJpcHBsZXNfLmZvckVhY2goZnVuY3Rpb24gKGljb25SaXBwbGUpIHsgcmV0dXJuIGljb25SaXBwbGUuZGVzdHJveSgpOyB9KTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVUYXJnZXRTY3JvbGxfKTtcclxuICAgICAgICBpZiAodGhpcy5uYXZJY29uXykge1xyXG4gICAgICAgICAgICB0aGlzLm5hdkljb25fLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVOYXZpZ2F0aW9uQ2xpY2tfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlzRml4ZWQgPSB0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLkZJWEVEX0NMQVNTKTtcclxuICAgICAgICB2YXIgaXNTaG9ydCA9IHRoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKGNzc0NsYXNzZXMuU0hPUlRfQ0xBU1MpO1xyXG4gICAgICAgIGlmICghaXNTaG9ydCAmJiAhaXNGaXhlZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVXaW5kb3dSZXNpemVfKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbiAgICB9O1xyXG4gICAgTURDVG9wQXBwQmFyLnByb3RvdHlwZS5zZXRTY3JvbGxUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHNjcm9sbCBoYW5kbGVyIGZyb20gdGhlIHByZXZpb3VzIHNjcm9sbCB0YXJnZXRcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVUYXJnZXRTY3JvbGxfKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFRhcmdldF8gPSB0YXJnZXQ7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGwgaGFuZGxlciBvbiB0aGUgbmV3IHNjcm9sbCB0YXJnZXRcclxuICAgICAgICB0aGlzLmhhbmRsZVRhcmdldFNjcm9sbF8gPVxyXG4gICAgICAgICAgICB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZVRhcmdldFNjcm9sbC5iaW5kKHRoaXMuZm91bmRhdGlvbl8pO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVGFyZ2V0Xy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVRhcmdldFNjcm9sbF8pO1xyXG4gICAgfTtcclxuICAgIE1EQ1RvcEFwcEJhci5wcm90b3R5cGUuZ2V0RGVmYXVsdEZvdW5kYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAvLyBETyBOT1QgSU5MSU5FIHRoaXMgdmFyaWFibGUuIEZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCBmb3VuZGF0aW9ucyB0YWtlIGEgUGFydGlhbDxNRENGb29BZGFwdGVyPi5cclxuICAgICAgICAvLyBUbyBlbnN1cmUgd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IG9taXQgYW55IG1ldGhvZHMsIHdlIG5lZWQgYSBzZXBhcmF0ZSwgc3Ryb25nbHkgdHlwZWQgYWRhcHRlciB2YXJpYWJsZS5cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXMgTWV0aG9kcyBzaG91bGQgYmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIGFkYXB0ZXIgaW50ZXJmYWNlLlxyXG4gICAgICAgIHZhciBhZGFwdGVyID0ge1xyXG4gICAgICAgICAgICBoYXNDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkgeyByZXR1cm4gX3RoaXMucm9vdF8uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7IH0sXHJcbiAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7IHJldHVybiBfdGhpcy5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH0sXHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7IHJldHVybiBfdGhpcy5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7IH0sXHJcbiAgICAgICAgICAgIHNldFN0eWxlOiBmdW5jdGlvbiAocHJvcGVydHksIHZhbHVlKSB7IHJldHVybiBfdGhpcy5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wZXJ0eSwgdmFsdWUpOyB9LFxyXG4gICAgICAgICAgICBnZXRUb3BBcHBCYXJIZWlnaHQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnJvb3RfLmNsaWVudEhlaWdodDsgfSxcclxuICAgICAgICAgICAgbm90aWZ5TmF2aWdhdGlvbkljb25DbGlja2VkOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5lbWl0KHN0cmluZ3MuTkFWSUdBVElPTl9FVkVOVCwge30pOyB9LFxyXG4gICAgICAgICAgICBnZXRWaWV3cG9ydFNjcm9sbFk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3aW4gPSBfdGhpcy5zY3JvbGxUYXJnZXRfO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVsID0gX3RoaXMuc2Nyb2xsVGFyZ2V0XztcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW4ucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCA/IHdpbi5wYWdlWU9mZnNldCA6IGVsLnNjcm9sbFRvcDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0VG90YWxBY3Rpb25JdGVtczogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMucm9vdF8ucXVlcnlTZWxlY3RvckFsbChzdHJpbmdzLkFDVElPTl9JVEVNX1NFTEVDVE9SKS5sZW5ndGg7IH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyB0c2xpbnQ6ZW5hYmxlOm9iamVjdC1saXRlcmFsLXNvcnQta2V5c1xyXG4gICAgICAgIHZhciBmb3VuZGF0aW9uO1xyXG4gICAgICAgIGlmICh0aGlzLnJvb3RfLmNsYXNzTGlzdC5jb250YWlucyhjc3NDbGFzc2VzLlNIT1JUX0NMQVNTKSkge1xyXG4gICAgICAgICAgICBmb3VuZGF0aW9uID0gbmV3IE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbihhZGFwdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5yb290Xy5jbGFzc0xpc3QuY29udGFpbnMoY3NzQ2xhc3Nlcy5GSVhFRF9DTEFTUykpIHtcclxuICAgICAgICAgICAgZm91bmRhdGlvbiA9IG5ldyBNRENGaXhlZFRvcEFwcEJhckZvdW5kYXRpb24oYWRhcHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3VuZGF0aW9uID0gbmV3IE1EQ1RvcEFwcEJhckZvdW5kYXRpb24oYWRhcHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3VuZGF0aW9uO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBNRENUb3BBcHBCYXI7XHJcbn0oTURDQ29tcG9uZW50KSk7XHJcbmV4cG9ydCB7IE1EQ1RvcEFwcEJhciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnQuanMubWFwIiwiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqXHJcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKlxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqIFRIRSBTT0ZUV0FSRS5cclxuICovXHJcbnZhciBjc3NDbGFzc2VzID0ge1xyXG4gICAgRklYRURfQ0xBU1M6ICdtZGMtdG9wLWFwcC1iYXItLWZpeGVkJyxcclxuICAgIEZJWEVEX1NDUk9MTEVEX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1maXhlZC1zY3JvbGxlZCcsXHJcbiAgICBTSE9SVF9DTEFTUzogJ21kYy10b3AtYXBwLWJhci0tc2hvcnQnLFxyXG4gICAgU0hPUlRfQ09MTEFQU0VEX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1jb2xsYXBzZWQnLFxyXG4gICAgU0hPUlRfSEFTX0FDVElPTl9JVEVNX0NMQVNTOiAnbWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1oYXMtYWN0aW9uLWl0ZW0nLFxyXG59O1xyXG52YXIgbnVtYmVycyA9IHtcclxuICAgIERFQk9VTkNFX1RIUk9UVExFX1JFU0laRV9USU1FX01TOiAxMDAsXHJcbiAgICBNQVhfVE9QX0FQUF9CQVJfSEVJR0hUOiAxMjgsXHJcbn07XHJcbnZhciBzdHJpbmdzID0ge1xyXG4gICAgQUNUSU9OX0lURU1fU0VMRUNUT1I6ICcubWRjLXRvcC1hcHAtYmFyX19hY3Rpb24taXRlbScsXHJcbiAgICBOQVZJR0FUSU9OX0VWRU5UOiAnTURDVG9wQXBwQmFyOm5hdicsXHJcbiAgICBOQVZJR0FUSU9OX0lDT05fU0VMRUNUT1I6ICcubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb24nLFxyXG4gICAgUk9PVF9TRUxFQ1RPUjogJy5tZGMtdG9wLWFwcC1iYXInLFxyXG4gICAgVElUTEVfU0VMRUNUT1I6ICcubWRjLXRvcC1hcHAtYmFyX190aXRsZScsXHJcbn07XHJcbmV4cG9ydCB7IGNzc0NsYXNzZXMsIG51bWJlcnMsIHN0cmluZ3MgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBjc3NDbGFzc2VzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTURDVG9wQXBwQmFyRm91bmRhdGlvbiB9IGZyb20gJy4uL3N0YW5kYXJkL2ZvdW5kYXRpb24nO1xyXG52YXIgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN0YXRlIHZhcmlhYmxlIGZvciB0aGUgcHJldmlvdXMgc2Nyb2xsIGl0ZXJhdGlvbiB0b3AgYXBwIGJhciBzdGF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF90aGlzLndhc1Njcm9sbGVkXyA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogU2Nyb2xsIGhhbmRsZXIgZm9yIGFwcGx5aW5nL3JlbW92aW5nIHRoZSBtb2RpZmllciBjbGFzcyBvbiB0aGUgZml4ZWQgdG9wIGFwcCBiYXIuXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVUYXJnZXRTY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTY3JvbGwgPSB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2Nyb2xsIDw9IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2FzU2Nyb2xsZWRfKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRklYRURfU0NST0xMRURfQ0xBU1MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YXNTY3JvbGxlZF8gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLndhc1Njcm9sbGVkXykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkZJWEVEX1NDUk9MTEVEX0NMQVNTKTtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FzU2Nyb2xsZWRfID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uO1xyXG59KE1EQ1RvcEFwcEJhckZvdW5kYXRpb24pKTtcclxuZXhwb3J0IHsgTURDRml4ZWRUb3BBcHBCYXJGb3VuZGF0aW9uIH07XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXHJcbmV4cG9ydCBkZWZhdWx0IE1EQ0ZpeGVkVG9wQXBwQmFyRm91bmRhdGlvbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgTURDRm91bmRhdGlvbiB9IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xyXG5pbXBvcnQgeyBjc3NDbGFzc2VzLCBudW1iZXJzLCBzdHJpbmdzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG52YXIgTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiwgX3N1cGVyKTtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBvcHRpb25hbCBhcmd1bWVudCBpcyBub3QgYSBicmFuY2ggc3RhdGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbihhZGFwdGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHRzbGliXzEuX19hc3NpZ24oe30sIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSkgfHwgdGhpcztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiwgXCJzdHJpbmdzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ3M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24sIFwiY3NzQ2xhc3Nlc1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjc3NDbGFzc2VzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uLCBcIm51bWJlcnNcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtYmVycztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiwgXCJkZWZhdWx0QWRhcHRlclwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VlIHtAbGluayBNRENUb3BBcHBCYXJBZGFwdGVyfSBmb3IgdHlwaW5nIGluZm9ybWF0aW9uIG9uIHBhcmFtZXRlcnMgYW5kIHJldHVybiB0eXBlcy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzIE1ldGhvZHMgc2hvdWxkIGJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBhZGFwdGVyIGludGVyZmFjZS5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH0sXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgaGFzQ2xhc3M6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxyXG4gICAgICAgICAgICAgICAgc2V0U3R5bGU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSxcclxuICAgICAgICAgICAgICAgIGdldFRvcEFwcEJhckhlaWdodDogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcclxuICAgICAgICAgICAgICAgIG5vdGlmeU5hdmlnYXRpb25JY29uQ2xpY2tlZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0Vmlld3BvcnRTY3JvbGxZOiBmdW5jdGlvbiAoKSB7IHJldHVybiAwOyB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0VG90YWxBY3Rpb25JdGVtczogZnVuY3Rpb24gKCkgeyByZXR1cm4gMDsgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKiBPdGhlciB2YXJpYW50cyBvZiBUb3BBcHBCYXIgZm91bmRhdGlvbiBvdmVycmlkZXMgdGhpcyBtZXRob2QgKi9cclxuICAgIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVUYXJnZXRTY3JvbGwgPSBmdW5jdGlvbiAoKSB7IH07IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZW1wdHlcclxuICAgIC8qKiBPdGhlciB2YXJpYW50cyBvZiBUb3BBcHBCYXIgZm91bmRhdGlvbiBvdmVycmlkZXMgdGhpcyBtZXRob2QgKi9cclxuICAgIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVXaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7IH07IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tZW1wdHlcclxuICAgIE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVOYXZpZ2F0aW9uQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5ub3RpZnlOYXZpZ2F0aW9uSWNvbkNsaWNrZWQoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb247XHJcbn0oTURDRm91bmRhdGlvbikpO1xyXG5leHBvcnQgeyBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbiB9O1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVmYXVsdC1leHBvcnQgTmVlZGVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggTURDIFdlYiB2MC40NC4wIGFuZCBlYXJsaWVyLlxyXG5leHBvcnQgZGVmYXVsdCBNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZm91bmRhdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZml4ZWQvZm91bmRhdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2hvcnQvZm91bmRhdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc3RhbmRhcmQvZm91bmRhdGlvbic7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKlxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICpcclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xyXG5pbXBvcnQgeyBjc3NDbGFzc2VzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24gfSBmcm9tICcuLi9mb3VuZGF0aW9uJztcclxudmFyIE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIHRzbGliXzEuX19leHRlbmRzKE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbiwgX3N1cGVyKTtcclxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBvcHRpb25hbCBhcmd1bWVudCBpcyBub3QgYSBicmFuY2ggc3RhdGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24oYWRhcHRlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGFkYXB0ZXIpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuaXNDb2xsYXBzZWRfID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbi5wcm90b3R5cGUsIFwiaXNDb2xsYXBzZWRcIiwge1xyXG4gICAgICAgIC8vIFB1YmxpYyB2aXNpYmlsaXR5IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc0NvbGxhcHNlZF87XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb24ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uZ2V0VG90YWxBY3Rpb25JdGVtcygpID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuU0hPUlRfSEFTX0FDVElPTl9JVEVNX0NMQVNTKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcyBpcyBpbnRlbmRlZCBhcyB0aGUgc2hvcnQgdmFyaWFudCBtdXN0IGNhbGN1bGF0ZSBpZiB0aGVcclxuICAgICAgICAvLyBwYWdlIHN0YXJ0cyBvZmYgZnJvbSB0aGUgdG9wIG9mIHRoZSBwYWdlLlxyXG4gICAgICAgIHRoaXMuaGFuZGxlVGFyZ2V0U2Nyb2xsKCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTY3JvbGwgaGFuZGxlciBmb3IgYXBwbHlpbmcvcmVtb3ZpbmcgdGhlIGNvbGxhcHNlZCBtb2RpZmllciBjbGFzcyBvbiB0aGUgc2hvcnQgdG9wIGFwcCBiYXIuXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgTURDU2hvcnRUb3BBcHBCYXJGb3VuZGF0aW9uLnByb3RvdHlwZS5oYW5kbGVUYXJnZXRTY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaGFzQ2xhc3MoY3NzQ2xhc3Nlcy5TSE9SVF9DT0xMQVBTRURfQ0xBU1MpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTY3JvbGwgPSB0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2Nyb2xsIDw9IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb2xsYXBzZWRfKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuU0hPUlRfQ09MTEFQU0VEX0NMQVNTKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWRfID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbGxhcHNlZF8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5TSE9SVF9DT0xMQVBTRURfQ0xBU1MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZF8gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBNRENTaG9ydFRvcEFwcEJhckZvdW5kYXRpb247XHJcbn0oTURDVG9wQXBwQmFyQmFzZUZvdW5kYXRpb24pKTtcclxuZXhwb3J0IHsgTURDU2hvcnRUb3BBcHBCYXJGb3VuZGF0aW9uIH07XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXHJcbmV4cG9ydCBkZWZhdWx0IE1EQ1Nob3J0VG9wQXBwQmFyRm91bmRhdGlvbjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Zm91bmRhdGlvbi5qcy5tYXAiLCIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cclxuICpcclxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICpcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqXHJcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuaW1wb3J0ICogYXMgdHNsaWJfMSBmcm9tIFwidHNsaWJcIjtcclxuaW1wb3J0IHsgbnVtYmVycyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IE1EQ1RvcEFwcEJhckJhc2VGb3VuZGF0aW9uIH0gZnJvbSAnLi4vZm91bmRhdGlvbic7XHJcbnZhciBJTklUSUFMX1ZBTFVFID0gMDtcclxudmFyIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhNRENUb3BBcHBCYXJGb3VuZGF0aW9uLCBfc3VwZXIpO1xyXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IG9wdGlvbmFsIGFyZ3VtZW50IGlzIG5vdCBhIGJyYW5jaCBzdGF0ZW1lbnQgKi9cclxuICAgIGZ1bmN0aW9uIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24oYWRhcHRlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGFkYXB0ZXIpIHx8IHRoaXM7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSB0b3AgYXBwIGJhciB3YXMgZG9ja2VkIGluIHRoZSBwcmV2aW91cyBzY3JvbGwgaGFuZGxlciBpdGVyYXRpb24uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3RoaXMud2FzRG9ja2VkXyA9IHRydWU7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSB0b3AgYXBwIGJhciBpcyBkb2NrZWQgaW4gdGhlIGZ1bGx5IHNob3duIHBvc2l0aW9uLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF90aGlzLmlzRG9ja2VkU2hvd2luZ18gPSB0cnVlO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhcmlhYmxlIGZvciBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBvZiB0aGUgdG9wIGFwcCBiYXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBfdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA9IDA7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXNlZCB0byBwcmV2ZW50IHRoZSB0b3AgYXBwIGJhciBmcm9tIGJlaW5nIHNjcm9sbGVkIG91dCBvZiB2aWV3IGR1cmluZyByZXNpemUgZXZlbnRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3RoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWRfID0gZmFsc2U7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHRpbWVvdXQgdGhhdCdzIHVzZWQgdG8gdGhyb3R0bGUgdGhlIHJlc2l6ZSBldmVudHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBfdGhpcy5yZXNpemVUaHJvdHRsZUlkXyA9IElOSVRJQUxfVkFMVUU7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHRpbWVvdXQgdGhhdCdzIHVzZWQgdG8gZGVib3VuY2UgdG9nZ2xpbmcgdGhlIGlzQ3VycmVudGx5QmVpbmdSZXNpemVkXyB2YXJpYWJsZSBhZnRlciBhIHJlc2l6ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF90aGlzLnJlc2l6ZURlYm91bmNlSWRfID0gSU5JVElBTF9WQUxVRTtcclxuICAgICAgICBfdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb25fID0gX3RoaXMuYWRhcHRlcl8uZ2V0Vmlld3BvcnRTY3JvbGxZKCk7XHJcbiAgICAgICAgX3RoaXMudG9wQXBwQmFySGVpZ2h0XyA9IF90aGlzLmFkYXB0ZXJfLmdldFRvcEFwcEJhckhlaWdodCgpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5zZXRTdHlsZSgndG9wJywgJycpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2Nyb2xsIGhhbmRsZXIgZm9yIHRoZSBkZWZhdWx0IHNjcm9sbCBiZWhhdmlvciBvZiB0aGUgdG9wIGFwcCBiYXIuXHJcbiAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAqL1xyXG4gICAgTURDVG9wQXBwQmFyRm91bmRhdGlvbi5wcm90b3R5cGUuaGFuZGxlVGFyZ2V0U2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBNYXRoLm1heCh0aGlzLmFkYXB0ZXJfLmdldFZpZXdwb3J0U2Nyb2xsWSgpLCAwKTtcclxuICAgICAgICB2YXIgZGlmZiA9IGN1cnJlbnRTY3JvbGxQb3NpdGlvbiAtIHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uXztcclxuICAgICAgICB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbl8gPSBjdXJyZW50U2Nyb2xsUG9zaXRpb247XHJcbiAgICAgICAgLy8gSWYgdGhlIHdpbmRvdyBpcyBiZWluZyByZXNpemVkIHRoZSBsYXN0U2Nyb2xsUG9zaXRpb25fIG5lZWRzIHRvIGJlIHVwZGF0ZWQgYnV0IHRoZVxyXG4gICAgICAgIC8vIGN1cnJlbnQgc2Nyb2xsIG9mIHRoZSB0b3AgYXBwIGJhciBzaG91bGQgc3RheSBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cclxuICAgICAgICBpZiAoIXRoaXMuaXNDdXJyZW50bHlCZWluZ1Jlc2l6ZWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gLT0gZGlmZjtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3BfID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChNYXRoLmFicyh0aGlzLmN1cnJlbnRBcHBCYXJPZmZzZXRUb3BfKSA+IHRoaXMudG9wQXBwQmFySGVpZ2h0Xykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA9IC10aGlzLnRvcEFwcEJhckhlaWdodF87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb3ZlVG9wQXBwQmFyXygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRvcCBhcHAgYmFyIHJlc2l6ZSBoYW5kbGVyIHRoYXQgdGhyb3R0bGUvZGVib3VuY2UgZnVuY3Rpb25zIHRoYXQgZXhlY3V0ZSB1cGRhdGVzLlxyXG4gICAgICogQG92ZXJyaWRlXHJcbiAgICAgKi9cclxuICAgIE1EQ1RvcEFwcEJhckZvdW5kYXRpb24ucHJvdG90eXBlLmhhbmRsZVdpbmRvd1Jlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIFRocm90dGxlIHJlc2l6ZSBldmVudHMgMTAgcC9zXHJcbiAgICAgICAgaWYgKCF0aGlzLnJlc2l6ZVRocm90dGxlSWRfKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplVGhyb3R0bGVJZF8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlc2l6ZVRocm90dGxlSWRfID0gSU5JVElBTF9WQUxVRTtcclxuICAgICAgICAgICAgICAgIF90aGlzLnRocm90dGxlZFJlc2l6ZUhhbmRsZXJfKCk7XHJcbiAgICAgICAgICAgIH0sIG51bWJlcnMuREVCT1VOQ0VfVEhST1RUTEVfUkVTSVpFX1RJTUVfTVMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzQ3VycmVudGx5QmVpbmdSZXNpemVkXyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzaXplRGVib3VuY2VJZF8pIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplRGVib3VuY2VJZF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2l6ZURlYm91bmNlSWRfID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmhhbmRsZVRhcmdldFNjcm9sbCgpO1xyXG4gICAgICAgICAgICBfdGhpcy5pc0N1cnJlbnRseUJlaW5nUmVzaXplZF8gPSBmYWxzZTtcclxuICAgICAgICAgICAgX3RoaXMucmVzaXplRGVib3VuY2VJZF8gPSBJTklUSUFMX1ZBTFVFO1xyXG4gICAgICAgIH0sIG51bWJlcnMuREVCT1VOQ0VfVEhST1RUTEVfUkVTSVpFX1RJTUVfTVMpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIHRoZSBET00gbmVlZHMgdG8gdXBkYXRlLlxyXG4gICAgICovXHJcbiAgICBNRENUb3BBcHBCYXJGb3VuZGF0aW9uLnByb3RvdHlwZS5jaGVja0ZvclVwZGF0ZV8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG9mZnNjcmVlbkJvdW5kYXJ5VG9wID0gLXRoaXMudG9wQXBwQmFySGVpZ2h0XztcclxuICAgICAgICB2YXIgaGFzQW55UGl4ZWxzT2Zmc2NyZWVuID0gdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA8IDA7XHJcbiAgICAgICAgdmFyIGhhc0FueVBpeGVsc09uc2NyZWVuID0gdGhpcy5jdXJyZW50QXBwQmFyT2Zmc2V0VG9wXyA+IG9mZnNjcmVlbkJvdW5kYXJ5VG9wO1xyXG4gICAgICAgIHZhciBwYXJ0aWFsbHlTaG93aW5nID0gaGFzQW55UGl4ZWxzT2Zmc2NyZWVuICYmIGhhc0FueVBpeGVsc09uc2NyZWVuO1xyXG4gICAgICAgIC8vIElmIGl0J3MgcGFydGlhbGx5IHNob3dpbmcsIGl0IGNhbid0IGJlIGRvY2tlZC5cclxuICAgICAgICBpZiAocGFydGlhbGx5U2hvd2luZykge1xyXG4gICAgICAgICAgICB0aGlzLndhc0RvY2tlZF8gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIE5vdCBwcmV2aW91c2x5IGRvY2tlZCBhbmQgbm90IHBhcnRpYWxseSBzaG93aW5nLCBpdCdzIG5vdyBkb2NrZWQuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy53YXNEb2NrZWRfKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhc0RvY2tlZF8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc0RvY2tlZFNob3dpbmdfICE9PSBoYXNBbnlQaXhlbHNPbnNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0RvY2tlZFNob3dpbmdfID0gaGFzQW55UGl4ZWxzT25zY3JlZW47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFydGlhbGx5U2hvd2luZztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIG1vdmUgdGhlIHRvcCBhcHAgYmFyIGlmIG5lZWRlZC5cclxuICAgICAqL1xyXG4gICAgTURDVG9wQXBwQmFyRm91bmRhdGlvbi5wcm90b3R5cGUubW92ZVRvcEFwcEJhcl8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tGb3JVcGRhdGVfKCkpIHtcclxuICAgICAgICAgICAgLy8gT25jZSB0aGUgdG9wIGFwcCBiYXIgaXMgZnVsbHkgaGlkZGVuIHdlIHVzZSB0aGUgbWF4IHBvdGVudGlhbCB0b3AgYXBwIGJhciBoZWlnaHQgYXMgb3VyIG9mZnNldFxyXG4gICAgICAgICAgICAvLyBzbyB0aGUgdG9wIGFwcCBiYXIgZG9lc24ndCBzaG93IGlmIHRoZSB3aW5kb3cgcmVzaXplcyBhbmQgdGhlIG5ldyBoZWlnaHQgPiB0aGUgb2xkIGhlaWdodC5cclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF87XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhvZmZzZXQpID49IHRoaXMudG9wQXBwQmFySGVpZ2h0Xykge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gLW51bWJlcnMuTUFYX1RPUF9BUFBfQkFSX0hFSUdIVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkYXB0ZXJfLnNldFN0eWxlKCd0b3AnLCBvZmZzZXQgKyAncHgnKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaHJvdHRsZWQgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHRoZSB0b3AgYXBwIGJhciBzY3JvbGxlZCB2YWx1ZXMgaWYgdGhlXHJcbiAgICAgKiB0b3AgYXBwIGJhciBoZWlnaHQgY2hhbmdlcy5cclxuICAgICAqL1xyXG4gICAgTURDVG9wQXBwQmFyRm91bmRhdGlvbi5wcm90b3R5cGUudGhyb3R0bGVkUmVzaXplSGFuZGxlcl8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRIZWlnaHQgPSB0aGlzLmFkYXB0ZXJfLmdldFRvcEFwcEJhckhlaWdodCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnRvcEFwcEJhckhlaWdodF8gIT09IGN1cnJlbnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy53YXNEb2NrZWRfID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSB0b3AgYXBwIGJhciBoYXMgYSBkaWZmZXJlbnQgaGVpZ2h0IGRlcGVuZGluZyBvbiB0aGUgc2NyZWVuIHdpZHRoLCB0aGlzXHJcbiAgICAgICAgICAgIC8vIHdpbGwgZW5zdXJlIHRoYXQgdGhlIHRvcCBhcHAgYmFyIHJlbWFpbnMgaW4gdGhlIGNvcnJlY3QgbG9jYXRpb24gaWZcclxuICAgICAgICAgICAgLy8gY29tcGxldGVseSBoaWRkZW4gYW5kIGEgcmVzaXplIG1ha2VzIHRoZSB0b3AgYXBwIGJhciBhIGRpZmZlcmVudCBoZWlnaHQuXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFwcEJhck9mZnNldFRvcF8gLT0gdGhpcy50b3BBcHBCYXJIZWlnaHRfIC0gY3VycmVudEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy50b3BBcHBCYXJIZWlnaHRfID0gY3VycmVudEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVUYXJnZXRTY3JvbGwoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gTURDVG9wQXBwQmFyRm91bmRhdGlvbjtcclxufShNRENUb3BBcHBCYXJCYXNlRm91bmRhdGlvbikpO1xyXG5leHBvcnQgeyBNRENUb3BBcHBCYXJGb3VuZGF0aW9uIH07XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWZhdWx0LWV4cG9ydCBOZWVkZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBNREMgV2ViIHYwLjQ0LjAgYW5kIGVhcmxpZXIuXHJcbmV4cG9ydCBkZWZhdWx0IE1EQ1RvcEFwcEJhckZvdW5kYXRpb247XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvdW5kYXRpb24uanMubWFwIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFuc2lIVE1MXHJcblxyXG4vLyBSZWZlcmVuY2UgdG8gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9hbnNpLXJlZ2V4XHJcbnZhciBfcmVnQU5TSSA9IC8oPzooPzpcXHUwMDFiXFxbKXxcXHUwMDliKSg/Oig/OlswLTldezEsM30pPyg/Oig/OjtbMC05XXswLDN9KSopP1tBLU18Zi1tXSl8XFx1MDAxYltBLU1dL1xyXG5cclxudmFyIF9kZWZDb2xvcnMgPSB7XHJcbiAgcmVzZXQ6IFsnZmZmJywgJzAwMCddLCAvLyBbRk9SRUdST1VEX0NPTE9SLCBCQUNLR1JPVU5EX0NPTE9SXVxyXG4gIGJsYWNrOiAnMDAwJyxcclxuICByZWQ6ICdmZjAwMDAnLFxyXG4gIGdyZWVuOiAnMjA5ODA1JyxcclxuICB5ZWxsb3c6ICdlOGJmMDMnLFxyXG4gIGJsdWU6ICcwMDAwZmYnLFxyXG4gIG1hZ2VudGE6ICdmZjAwZmYnLFxyXG4gIGN5YW46ICcwMGZmZWUnLFxyXG4gIGxpZ2h0Z3JleTogJ2YwZjBmMCcsXHJcbiAgZGFya2dyZXk6ICc4ODgnXHJcbn1cclxudmFyIF9zdHlsZXMgPSB7XHJcbiAgMzA6ICdibGFjaycsXHJcbiAgMzE6ICdyZWQnLFxyXG4gIDMyOiAnZ3JlZW4nLFxyXG4gIDMzOiAneWVsbG93JyxcclxuICAzNDogJ2JsdWUnLFxyXG4gIDM1OiAnbWFnZW50YScsXHJcbiAgMzY6ICdjeWFuJyxcclxuICAzNzogJ2xpZ2h0Z3JleSdcclxufVxyXG52YXIgX29wZW5UYWdzID0ge1xyXG4gICcxJzogJ2ZvbnQtd2VpZ2h0OmJvbGQnLCAvLyBib2xkXHJcbiAgJzInOiAnb3BhY2l0eTowLjUnLCAvLyBkaW1cclxuICAnMyc6ICc8aT4nLCAvLyBpdGFsaWNcclxuICAnNCc6ICc8dT4nLCAvLyB1bmRlcnNjb3JlXHJcbiAgJzgnOiAnZGlzcGxheTpub25lJywgLy8gaGlkZGVuXHJcbiAgJzknOiAnPGRlbD4nIC8vIGRlbGV0ZVxyXG59XHJcbnZhciBfY2xvc2VUYWdzID0ge1xyXG4gICcyMyc6ICc8L2k+JywgLy8gcmVzZXQgaXRhbGljXHJcbiAgJzI0JzogJzwvdT4nLCAvLyByZXNldCB1bmRlcnNjb3JlXHJcbiAgJzI5JzogJzwvZGVsPicgLy8gcmVzZXQgZGVsZXRlXHJcbn1cclxuXHJcbjtbMCwgMjEsIDIyLCAyNywgMjgsIDM5LCA0OV0uZm9yRWFjaChmdW5jdGlvbiAobikge1xyXG4gIF9jbG9zZVRhZ3Nbbl0gPSAnPC9zcGFuPidcclxufSlcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0ZXh0IHdpdGggQU5TSSBjb2xvciBjb2RlcyB0byBIVE1MIG1hcmt1cC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHRleHRcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBhbnNpSFRNTCAodGV4dCkge1xyXG4gIC8vIFJldHVybnMgdGhlIHRleHQgaWYgdGhlIHN0cmluZyBoYXMgbm8gQU5TSSBlc2NhcGUgY29kZS5cclxuICBpZiAoIV9yZWdBTlNJLnRlc3QodGV4dCkpIHtcclxuICAgIHJldHVybiB0ZXh0XHJcbiAgfVxyXG5cclxuICAvLyBDYWNoZSBvcGVuZWQgc2VxdWVuY2UuXHJcbiAgdmFyIGFuc2lDb2RlcyA9IFtdXHJcbiAgLy8gUmVwbGFjZSB3aXRoIG1hcmt1cC5cclxuICB2YXIgcmV0ID0gdGV4dC5yZXBsYWNlKC9cXDAzM1xcWyhcXGQrKSptL2csIGZ1bmN0aW9uIChtYXRjaCwgc2VxKSB7XHJcbiAgICB2YXIgb3QgPSBfb3BlblRhZ3Nbc2VxXVxyXG4gICAgaWYgKG90KSB7XHJcbiAgICAgIC8vIElmIGN1cnJlbnQgc2VxdWVuY2UgaGFzIGJlZW4gb3BlbmVkLCBjbG9zZSBpdC5cclxuICAgICAgaWYgKCEhfmFuc2lDb2Rlcy5pbmRleE9mKHNlcSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1leHRyYS1ib29sZWFuLWNhc3RcclxuICAgICAgICBhbnNpQ29kZXMucG9wKClcclxuICAgICAgICByZXR1cm4gJzwvc3Bhbj4nXHJcbiAgICAgIH1cclxuICAgICAgLy8gT3BlbiB0YWcuXHJcbiAgICAgIGFuc2lDb2Rlcy5wdXNoKHNlcSlcclxuICAgICAgcmV0dXJuIG90WzBdID09PSAnPCcgPyBvdCA6ICc8c3BhbiBzdHlsZT1cIicgKyBvdCArICc7XCI+J1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdCA9IF9jbG9zZVRhZ3Nbc2VxXVxyXG4gICAgaWYgKGN0KSB7XHJcbiAgICAgIC8vIFBvcCBzZXF1ZW5jZVxyXG4gICAgICBhbnNpQ29kZXMucG9wKClcclxuICAgICAgcmV0dXJuIGN0XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJydcclxuICB9KVxyXG5cclxuICAvLyBNYWtlIHN1cmUgdGFncyBhcmUgY2xvc2VkLlxyXG4gIHZhciBsID0gYW5zaUNvZGVzLmxlbmd0aFxyXG4gIDsobCA+IDApICYmIChyZXQgKz0gQXJyYXkobCArIDEpLmpvaW4oJzwvc3Bhbj4nKSlcclxuXHJcbiAgcmV0dXJuIHJldFxyXG59XHJcblxyXG4vKipcclxuICogQ3VzdG9taXplIGNvbG9ycy5cclxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9ycyByZWZlcmVuY2UgdG8gX2RlZkNvbG9yc1xyXG4gKi9cclxuYW5zaUhUTUwuc2V0Q29sb3JzID0gZnVuY3Rpb24gKGNvbG9ycykge1xyXG4gIGlmICh0eXBlb2YgY29sb3JzICE9PSAnb2JqZWN0Jykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdgY29sb3JzYCBwYXJhbWV0ZXIgbXVzdCBiZSBhbiBPYmplY3QuJylcclxuICB9XHJcblxyXG4gIHZhciBfZmluYWxDb2xvcnMgPSB7fVxyXG4gIGZvciAodmFyIGtleSBpbiBfZGVmQ29sb3JzKSB7XHJcbiAgICB2YXIgaGV4ID0gY29sb3JzLmhhc093blByb3BlcnR5KGtleSkgPyBjb2xvcnNba2V5XSA6IG51bGxcclxuICAgIGlmICghaGV4KSB7XHJcbiAgICAgIF9maW5hbENvbG9yc1trZXldID0gX2RlZkNvbG9yc1trZXldXHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcbiAgICBpZiAoJ3Jlc2V0JyA9PT0ga2V5KSB7XHJcbiAgICAgIGlmICh0eXBlb2YgaGV4ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGhleCA9IFtoZXhdXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGhleCkgfHwgaGV4Lmxlbmd0aCA9PT0gMCB8fCBoZXguc29tZShmdW5jdGlvbiAoaCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgaCAhPT0gJ3N0cmluZydcclxuICAgICAgfSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB2YWx1ZSBvZiBgJyArIGtleSArICdgIHByb3BlcnR5IG11c3QgYmUgYW4gQXJyYXkgYW5kIGVhY2ggaXRlbSBjb3VsZCBvbmx5IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcclxuICAgICAgfVxyXG4gICAgICB2YXIgZGVmSGV4Q29sb3IgPSBfZGVmQ29sb3JzW2tleV1cclxuICAgICAgaWYgKCFoZXhbMF0pIHtcclxuICAgICAgICBoZXhbMF0gPSBkZWZIZXhDb2xvclswXVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChoZXgubGVuZ3RoID09PSAxIHx8ICFoZXhbMV0pIHtcclxuICAgICAgICBoZXggPSBbaGV4WzBdXVxyXG4gICAgICAgIGhleC5wdXNoKGRlZkhleENvbG9yWzFdKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBoZXggPSBoZXguc2xpY2UoMCwgMilcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdmFsdWUgb2YgYCcgKyBrZXkgKyAnYCBwcm9wZXJ0eSBtdXN0IGJlIGEgaGV4IHN0cmluZywgZS5nLjogRkYwMDAwJylcclxuICAgIH1cclxuICAgIF9maW5hbENvbG9yc1trZXldID0gaGV4XHJcbiAgfVxyXG4gIF9zZXRUYWdzKF9maW5hbENvbG9ycylcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlc2V0IGNvbG9ycy5cclxuICovXHJcbmFuc2lIVE1MLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zZXRUYWdzKF9kZWZDb2xvcnMpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgdGFncywgaW5jbHVkaW5nIG9wZW4gYW5kIGNsb3NlLlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuYW5zaUhUTUwudGFncyA9IHt9XHJcblxyXG5pZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdvcGVuJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfb3BlblRhZ3MgfVxyXG4gIH0pXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuc2lIVE1MLnRhZ3MsICdjbG9zZScsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX2Nsb3NlVGFncyB9XHJcbiAgfSlcclxufSBlbHNlIHtcclxuICBhbnNpSFRNTC50YWdzLm9wZW4gPSBfb3BlblRhZ3NcclxuICBhbnNpSFRNTC50YWdzLmNsb3NlID0gX2Nsb3NlVGFnc1xyXG59XHJcblxyXG5mdW5jdGlvbiBfc2V0VGFncyAoY29sb3JzKSB7XHJcbiAgLy8gcmVzZXQgYWxsXHJcbiAgX29wZW5UYWdzWycwJ10gPSAnZm9udC13ZWlnaHQ6bm9ybWFsO29wYWNpdHk6MTtjb2xvcjojJyArIGNvbG9ycy5yZXNldFswXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFsxXVxyXG4gIC8vIGludmVyc2VcclxuICBfb3BlblRhZ3NbJzcnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5yZXNldFsxXSArICc7YmFja2dyb3VuZDojJyArIGNvbG9ycy5yZXNldFswXVxyXG4gIC8vIGRhcmsgZ3JleVxyXG4gIF9vcGVuVGFnc1snOTAnXSA9ICdjb2xvcjojJyArIGNvbG9ycy5kYXJrZ3JleVxyXG5cclxuICBmb3IgKHZhciBjb2RlIGluIF9zdHlsZXMpIHtcclxuICAgIHZhciBjb2xvciA9IF9zdHlsZXNbY29kZV1cclxuICAgIHZhciBvcmlDb2xvciA9IGNvbG9yc1tjb2xvcl0gfHwgJzAwMCdcclxuICAgIF9vcGVuVGFnc1tjb2RlXSA9ICdjb2xvcjojJyArIG9yaUNvbG9yXHJcbiAgICBjb2RlID0gcGFyc2VJbnQoY29kZSlcclxuICAgIF9vcGVuVGFnc1soY29kZSArIDEwKS50b1N0cmluZygpXSA9ICdiYWNrZ3JvdW5kOiMnICsgb3JpQ29sb3JcclxuICB9XHJcbn1cclxuXHJcbmFuc2lIVE1MLnJlc2V0KClcclxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubWRjLXRvcC1hcHAtYmFyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNDczYjg7XFxuICAvKiBAYWx0ZXJuYXRlICovXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tZGMtdGhlbWUtcHJpbWFyeSwgIzA0NzNiOCk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB3aWR0aDogMTAwJTtcXG4gIHotaW5kZXg6IDQ7IH1cXG4gIC5tZGMtdG9wLWFwcC1iYXIgLm1kYy10b3AtYXBwLWJhcl9fYWN0aW9uLWl0ZW0sXFxuICAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX25hdmlnYXRpb24taWNvbiB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICAvKiBAYWx0ZXJuYXRlICovXFxuICAgIGNvbG9yOiB2YXIoLS1tZGMtdGhlbWUtb24tcHJpbWFyeSwgI2ZmZik7IH1cXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19hY3Rpb24taXRlbTo6YmVmb3JlLCAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtOjphZnRlcixcXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb246OmJlZm9yZSxcXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb246OmFmdGVyIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XFxuICAgICAgQHN1cHBvcnRzIG5vdCAoLW1zLWltZS1hbGlnbjogYXV0bykge1xcbiAgICAgICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19hY3Rpb24taXRlbTo6YmVmb3JlLCAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtOjphZnRlcixcXG4gICAgICAgIC5tZGMtdG9wLWFwcC1iYXIgLm1kYy10b3AtYXBwLWJhcl9fbmF2aWdhdGlvbi1pY29uOjpiZWZvcmUsXFxuICAgICAgICAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX25hdmlnYXRpb24taWNvbjo6YWZ0ZXIge1xcbiAgICAgICAgICAvKiBAYWx0ZXJuYXRlICovXFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kYy10aGVtZS1vbi1wcmltYXJ5LCAjZmZmKTsgfSB9XFxuICAgIC5tZGMtdG9wLWFwcC1iYXIgLm1kYy10b3AtYXBwLWJhcl9fYWN0aW9uLWl0ZW06aG92ZXI6OmJlZm9yZSxcXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb246aG92ZXI6OmJlZm9yZSB7XFxuICAgICAgb3BhY2l0eTogMC4wODsgfVxcbiAgICAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6Zm9jdXM6OmJlZm9yZSwgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19hY3Rpb24taXRlbS5tZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6OmJlZm9yZSxcXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb246bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTpmb2N1czo6YmVmb3JlLFxcbiAgICAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX25hdmlnYXRpb24taWNvbi5tZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6OmJlZm9yZSB7XFxuICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNzVtcztcXG4gICAgICBvcGFjaXR5OiAwLjI0OyB9XFxuICAgIC5tZGMtdG9wLWFwcC1iYXIgLm1kYy10b3AtYXBwLWJhcl9fYWN0aW9uLWl0ZW06bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTo6YWZ0ZXIsXFxuICAgIC5tZGMtdG9wLWFwcC1iYXIgLm1kYy10b3AtYXBwLWJhcl9fbmF2aWdhdGlvbi1pY29uOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6OmFmdGVyIHtcXG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE1MG1zIGxpbmVhcjsgfVxcbiAgICAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6YWN0aXZlOjphZnRlcixcXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb246bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTphY3RpdmU6OmFmdGVyIHtcXG4gICAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiA3NW1zO1xcbiAgICAgIG9wYWNpdHk6IDAuMjQ7IH1cXG4gICAgLm1kYy10b3AtYXBwLWJhciAubWRjLXRvcC1hcHAtYmFyX19hY3Rpb24taXRlbS5tZGMtcmlwcGxlLXVwZ3JhZGVkLFxcbiAgICAubWRjLXRvcC1hcHAtYmFyIC5tZGMtdG9wLWFwcC1iYXJfX25hdmlnYXRpb24taWNvbi5tZGMtcmlwcGxlLXVwZ3JhZGVkIHtcXG4gICAgICAtLW1kYy1yaXBwbGUtZmctb3BhY2l0eTogMC4yNDsgfVxcbiAgLm1kYy10b3AtYXBwLWJhcl9fcm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiA2NHB4OyB9XFxuICAubWRjLXRvcC1hcHAtYmFyX19zZWN0aW9uIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICAgIGZsZXg6IDEgMSBhdXRvO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtaW4td2lkdGg6IDA7XFxuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xcbiAgICB6LWluZGV4OiAxOyB9XFxuICAgIC5tZGMtdG9wLWFwcC1iYXJfX3NlY3Rpb24tLWFsaWduLXN0YXJ0IHtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICAgICAgb3JkZXI6IC0xOyB9XFxuICAgIC5tZGMtdG9wLWFwcC1iYXJfX3NlY3Rpb24tLWFsaWduLWVuZCB7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgICBvcmRlcjogMTsgfVxcbiAgLm1kYy10b3AtYXBwLWJhcl9fdGl0bGUge1xcbiAgICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xcbiAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgICBsaW5lLWhlaWdodDogMnJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDEyNWVtO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgei1pbmRleDogMTsgfVxcbiAgICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLXRvcC1hcHAtYmFyX190aXRsZSwgLm1kYy10b3AtYXBwLWJhcl9fdGl0bGVbZGlyPVxcXCJydGxcXFwiXSB7XFxuICAgICAgLyogQG5vZmxpcCAqL1xcbiAgICAgIHBhZGRpbmctbGVmdDogMDtcXG4gICAgICAvKiBAbm9mbGlwICovXFxuICAgICAgcGFkZGluZy1yaWdodDogMjBweDsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLXNob3J0LWNvbGxhcHNlZCB7XFxuICAvKiBAbm9mbGlwICovXFxuICBib3JkZXItcmFkaXVzOiAwIDAgMjRweCAwOyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1jb2xsYXBzZWQsIC5tZGMtdG9wLWFwcC1iYXItLXNob3J0LWNvbGxhcHNlZFtkaXI9XFxcInJ0bFxcXCJdIHtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMCAyNHB4OyB9XFxuXFxuLm1kYy10b3AtYXBwLWJhci0tc2hvcnQge1xcbiAgdG9wOiAwO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgcmlnaHQ6IGF1dG87XFxuICAvKiBAbm9mbGlwICovXFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCAyNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydCwgLm1kYy10b3AtYXBwLWJhci0tc2hvcnRbZGlyPVxcXCJydGxcXFwiXSB7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgcmlnaHQ6IDA7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbGVmdDogYXV0bzsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tc2hvcnQgLm1kYy10b3AtYXBwLWJhcl9fcm93IHtcXG4gICAgaGVpZ2h0OiA1NnB4OyB9XFxuICAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydCAubWRjLXRvcC1hcHAtYmFyX19zZWN0aW9uIHtcXG4gICAgcGFkZGluZzogNHB4OyB9XFxuICAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydCAubWRjLXRvcC1hcHAtYmFyX190aXRsZSB7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLXNob3J0LWNvbGxhcHNlZCB7XFxuICBib3gtc2hhZG93OiAwcHggMnB4IDRweCAtMXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDRweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNCksIDBweCAxcHggMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG4gIHdpZHRoOiA1NnB4O1xcbiAgdHJhbnNpdGlvbjogd2lkdGggMzAwbXMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkIC5tZGMtdG9wLWFwcC1iYXJfX3RpdGxlIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkIC5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtIHtcXG4gICAgdHJhbnNpdGlvbjogcGFkZGluZyAxNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuXFxuLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtaGFzLWFjdGlvbi1pdGVtIHtcXG4gIHdpZHRoOiAxMTJweDsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtaGFzLWFjdGlvbi1pdGVtIC5tZGMtdG9wLWFwcC1iYXJfX3NlY3Rpb24tLWFsaWduLWVuZCB7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7IH1cXG4gICAgW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtaGFzLWFjdGlvbi1pdGVtIC5tZGMtdG9wLWFwcC1iYXJfX3NlY3Rpb24tLWFsaWduLWVuZCwgLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtY29sbGFwc2VkLm1kYy10b3AtYXBwLWJhci0tc2hvcnQtaGFzLWFjdGlvbi1pdGVtIC5tZGMtdG9wLWFwcC1iYXJfX3NlY3Rpb24tLWFsaWduLWVuZFtkaXI9XFxcInJ0bFxcXCJdIHtcXG4gICAgICAvKiBAbm9mbGlwICovXFxuICAgICAgcGFkZGluZy1sZWZ0OiAxMnB4O1xcbiAgICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgICBwYWRkaW5nLXJpZ2h0OiAwOyB9XFxuXFxuLm1kYy10b3AtYXBwLWJhci0tZGVuc2UgLm1kYy10b3AtYXBwLWJhcl9fcm93IHtcXG4gIGhlaWdodDogNDhweDsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLWRlbnNlIC5tZGMtdG9wLWFwcC1iYXJfX3NlY3Rpb24ge1xcbiAgcGFkZGluZzogMCA0cHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1kZW5zZSAubWRjLXRvcC1hcHAtYmFyX190aXRsZSB7XFxuICAvKiBAbm9mbGlwICovXFxuICBwYWRkaW5nLWxlZnQ6IDEycHg7XFxuICAvKiBAbm9mbGlwICovXFxuICBwYWRkaW5nLXJpZ2h0OiAwOyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLXRvcC1hcHAtYmFyLS1kZW5zZSAubWRjLXRvcC1hcHAtYmFyX190aXRsZSwgLm1kYy10b3AtYXBwLWJhci0tZGVuc2UgLm1kYy10b3AtYXBwLWJhcl9fdGl0bGVbZGlyPVxcXCJydGxcXFwiXSB7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1wcm9taW5lbnQgLm1kYy10b3AtYXBwLWJhcl9fcm93IHtcXG4gIGhlaWdodDogMTI4cHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1wcm9taW5lbnQgLm1kYy10b3AtYXBwLWJhcl9fdGl0bGUge1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICBwYWRkaW5nLWJvdHRvbTogMnB4OyB9XFxuXFxuLm1kYy10b3AtYXBwLWJhci0tcHJvbWluZW50IC5tZGMtdG9wLWFwcC1iYXJfX2FjdGlvbi1pdGVtLFxcbi5tZGMtdG9wLWFwcC1iYXItLXByb21pbmVudCAubWRjLXRvcC1hcHAtYmFyX19uYXZpZ2F0aW9uLWljb24ge1xcbiAgYWxpZ24tc2VsZjogZmxleC1zdGFydDsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLWZpeGVkIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMjAwbXMgbGluZWFyOyB9XFxuXFxuLm1kYy10b3AtYXBwLWJhci0tZml4ZWQtc2Nyb2xsZWQge1xcbiAgYm94LXNoYWRvdzogMHB4IDJweCA0cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMiksIDBweCA0cHggNXB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwcHggMXB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDIwMG1zIGxpbmVhcjsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLWRlbnNlLm1kYy10b3AtYXBwLWJhci0tcHJvbWluZW50IC5tZGMtdG9wLWFwcC1iYXJfX3JvdyB7XFxuICBoZWlnaHQ6IDk2cHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1kZW5zZS5tZGMtdG9wLWFwcC1iYXItLXByb21pbmVudCAubWRjLXRvcC1hcHAtYmFyX19zZWN0aW9uIHtcXG4gIHBhZGRpbmc6IDAgMTJweDsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLWRlbnNlLm1kYy10b3AtYXBwLWJhci0tcHJvbWluZW50IC5tZGMtdG9wLWFwcC1iYXJfX3RpdGxlIHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxuICBwYWRkaW5nLWJvdHRvbTogOXB4OyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLXRvcC1hcHAtYmFyLS1kZW5zZS5tZGMtdG9wLWFwcC1iYXItLXByb21pbmVudCAubWRjLXRvcC1hcHAtYmFyX190aXRsZSwgLm1kYy10b3AtYXBwLWJhci0tZGVuc2UubWRjLXRvcC1hcHAtYmFyLS1wcm9taW5lbnQgLm1kYy10b3AtYXBwLWJhcl9fdGl0bGVbZGlyPVxcXCJydGxcXFwiXSB7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgcGFkZGluZy1sZWZ0OiAwO1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1maXhlZC1hZGp1c3Qge1xcbiAgcGFkZGluZy10b3A6IDY0cHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1kZW5zZS1maXhlZC1hZGp1c3Qge1xcbiAgcGFkZGluZy10b3A6IDQ4cHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1maXhlZC1hZGp1c3Qge1xcbiAgcGFkZGluZy10b3A6IDU2cHg7IH1cXG5cXG4ubWRjLXRvcC1hcHAtYmFyLS1wcm9taW5lbnQtZml4ZWQtYWRqdXN0IHtcXG4gIHBhZGRpbmctdG9wOiAxMjhweDsgfVxcblxcbi5tZGMtdG9wLWFwcC1iYXItLWRlbnNlLXByb21pbmVudC1maXhlZC1hZGp1c3Qge1xcbiAgcGFkZGluZy10b3A6IDk2cHg7IH1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNTk5cHgpIHtcXG4gIC5tZGMtdG9wLWFwcC1iYXJfX3JvdyB7XFxuICAgIGhlaWdodDogNTZweDsgfVxcbiAgLm1kYy10b3AtYXBwLWJhcl9fc2VjdGlvbiB7XFxuICAgIHBhZGRpbmc6IDRweDsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tc2hvcnQge1xcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAyMDBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuICAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1jb2xsYXBzZWQge1xcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAyNTBtcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpOyB9XFxuICAgIC5tZGMtdG9wLWFwcC1iYXItLXNob3J0LWNvbGxhcHNlZCAubWRjLXRvcC1hcHAtYmFyX19zZWN0aW9uLS1hbGlnbi1lbmQge1xcbiAgICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgICBwYWRkaW5nLWxlZnQ6IDA7XFxuICAgICAgLyogQG5vZmxpcCAqL1xcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDEycHg7IH1cXG4gICAgICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1jb2xsYXBzZWQgLm1kYy10b3AtYXBwLWJhcl9fc2VjdGlvbi0tYWxpZ24tZW5kLCAubWRjLXRvcC1hcHAtYmFyLS1zaG9ydC1jb2xsYXBzZWQgLm1kYy10b3AtYXBwLWJhcl9fc2VjdGlvbi0tYWxpZ24tZW5kW2Rpcj1cXFwicnRsXFxcIl0ge1xcbiAgICAgICAgLyogQG5vZmxpcCAqL1xcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMnB4O1xcbiAgICAgICAgLyogQG5vZmxpcCAqL1xcbiAgICAgICAgcGFkZGluZy1yaWdodDogMDsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tcHJvbWluZW50IC5tZGMtdG9wLWFwcC1iYXJfX3RpdGxlIHtcXG4gICAgcGFkZGluZy1ib3R0b206IDZweDsgfVxcbiAgLm1kYy10b3AtYXBwLWJhci0tZml4ZWQtYWRqdXN0IHtcXG4gICAgcGFkZGluZy10b3A6IDU2cHg7IH0gfVxcblxcbi5tZGMtaWNvbi1idXR0b24ge1xcbiAgd2lkdGg6IDQ4cHg7XFxuICBoZWlnaHQ6IDQ4cHg7XFxuICBwYWRkaW5nOiAxMnB4O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGZpbGw6IGN1cnJlbnRDb2xvcjtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG4gIC5tZGMtaWNvbi1idXR0b24gc3ZnLFxcbiAgLm1kYy1pY29uLWJ1dHRvbiBpbWcge1xcbiAgICB3aWR0aDogMjRweDtcXG4gICAgaGVpZ2h0OiAyNHB4OyB9XFxuICAubWRjLWljb24tYnV0dG9uOmRpc2FibGVkIHtcXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7XFxuICAgIC8qIEBhbHRlcm5hdGUgKi9cXG4gICAgY29sb3I6IHZhcigtLW1kYy10aGVtZS10ZXh0LWRpc2FibGVkLW9uLWxpZ2h0LCByZ2JhKDAsIDAsIDAsIDAuMzgpKTtcXG4gICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxcblxcbi5tZGMtaWNvbi1idXR0b25fX2ljb24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxuICAubWRjLWljb24tYnV0dG9uX19pY29uLm1kYy1pY29uLWJ1dHRvbl9faWNvbi0tb24ge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLm1kYy1pY29uLWJ1dHRvbi0tb24gLm1kYy1pY29uLWJ1dHRvbl9faWNvbiB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuICAubWRjLWljb24tYnV0dG9uLS1vbiAubWRjLWljb24tYnV0dG9uX19pY29uLm1kYy1pY29uLWJ1dHRvbl9faWNvbi0tb24ge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1kYy1yaXBwbGUtZmctcmFkaXVzLWluIHtcXG4gIGZyb20ge1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSh2YXIoLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCwgMCkpIHNjYWxlKDEpOyB9XFxuICB0byB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKHZhcigtLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCwgMCkpIHNjYWxlKHZhcigtLW1kYy1yaXBwbGUtZmctc2NhbGUsIDEpKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBtZGMtcmlwcGxlLWZnLW9wYWNpdHktaW4ge1xcbiAgZnJvbSB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiB2YXIoLS1tZGMtcmlwcGxlLWZnLW9wYWNpdHksIDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIG1kYy1yaXBwbGUtZmctb3BhY2l0eS1vdXQge1xcbiAgZnJvbSB7XFxuICAgIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcXG4gICAgb3BhY2l0eTogdmFyKC0tbWRjLXJpcHBsZS1mZy1vcGFjaXR5LCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4ubWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1ZyB7XFxuICAtLW1kYy1yaXBwbGUtc3VyZmFjZS10ZXN0LWVkZ2UtdmFyOiAxcHggc29saWQgIzAwMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjsgfVxcbiAgLm1kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWc6OmJlZm9yZSB7XFxuICAgIGJvcmRlcjogdmFyKC0tbWRjLXJpcHBsZS1zdXJmYWNlLXRlc3QtZWRnZS12YXIpOyB9XFxuXFxuLm1kYy1pY29uLWJ1dHRvbiB7XFxuICAtLW1kYy1yaXBwbGUtZmctc2l6ZTogMDtcXG4gIC0tbWRjLXJpcHBsZS1sZWZ0OiAwO1xcbiAgLS1tZGMtcmlwcGxlLXRvcDogMDtcXG4gIC0tbWRjLXJpcHBsZS1mZy1zY2FsZTogMTtcXG4gIC0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kOiAwO1xcbiAgLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydDogMDtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTsgfVxcbiAgLm1kYy1pY29uLWJ1dHRvbjo6YmVmb3JlLCAubWRjLWljb24tYnV0dG9uOjphZnRlciB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgY29udGVudDogXFxcIlxcXCI7IH1cXG4gIC5tZGMtaWNvbi1idXR0b246OmJlZm9yZSB7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMTVtcyBsaW5lYXIsIGJhY2tncm91bmQtY29sb3IgMTVtcyBsaW5lYXI7XFxuICAgIHotaW5kZXg6IDE7IH1cXG4gIC5tZGMtaWNvbi1idXR0b24ubWRjLXJpcHBsZS11cGdyYWRlZDo6YmVmb3JlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1tZGMtcmlwcGxlLWZnLXNjYWxlLCAxKSk7IH1cXG4gIC5tZGMtaWNvbi1idXR0b24ubWRjLXJpcHBsZS11cGdyYWRlZDo6YWZ0ZXIge1xcbiAgICB0b3A6IDA7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbGVmdDogMDtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjsgfVxcbiAgLm1kYy1pY29uLWJ1dHRvbi5tZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQ6OmFmdGVyIHtcXG4gICAgdG9wOiB2YXIoLS1tZGMtcmlwcGxlLXRvcCwgMCk7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbGVmdDogdmFyKC0tbWRjLXJpcHBsZS1sZWZ0LCAwKTsgfVxcbiAgLm1kYy1pY29uLWJ1dHRvbi5tZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb246OmFmdGVyIHtcXG4gICAgYW5pbWF0aW9uOiBtZGMtcmlwcGxlLWZnLXJhZGl1cy1pbiAyMjVtcyBmb3J3YXJkcywgbWRjLXJpcHBsZS1mZy1vcGFjaXR5LWluIDc1bXMgZm9yd2FyZHM7IH1cXG4gIC5tZGMtaWNvbi1idXR0b24ubWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb246OmFmdGVyIHtcXG4gICAgYW5pbWF0aW9uOiBtZGMtcmlwcGxlLWZnLW9wYWNpdHktb3V0IDE1MG1zO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSh2YXIoLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQsIDApKSBzY2FsZSh2YXIoLS1tZGMtcmlwcGxlLWZnLXNjYWxlLCAxKSk7IH1cXG4gIC5tZGMtaWNvbi1idXR0b246OmJlZm9yZSwgLm1kYy1pY29uLWJ1dHRvbjo6YWZ0ZXIge1xcbiAgICB0b3A6IGNhbGMoNTAlIC0gNTAlKTtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiBjYWxjKDUwJSAtIDUwJSk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gIC5tZGMtaWNvbi1idXR0b24ubWRjLXJpcHBsZS11cGdyYWRlZDo6YmVmb3JlLCAubWRjLWljb24tYnV0dG9uLm1kYy1yaXBwbGUtdXBncmFkZWQ6OmFmdGVyIHtcXG4gICAgdG9wOiB2YXIoLS1tZGMtcmlwcGxlLXRvcCwgY2FsYyg1MCUgLSA1MCUpKTtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiB2YXIoLS1tZGMtcmlwcGxlLWxlZnQsIGNhbGMoNTAlIC0gNTAlKSk7XFxuICAgIHdpZHRoOiB2YXIoLS1tZGMtcmlwcGxlLWZnLXNpemUsIDEwMCUpO1xcbiAgICBoZWlnaHQ6IHZhcigtLW1kYy1yaXBwbGUtZmctc2l6ZSwgMTAwJSk7IH1cXG4gIC5tZGMtaWNvbi1idXR0b24ubWRjLXJpcHBsZS11cGdyYWRlZDo6YWZ0ZXIge1xcbiAgICB3aWR0aDogdmFyKC0tbWRjLXJpcHBsZS1mZy1zaXplLCAxMDAlKTtcXG4gICAgaGVpZ2h0OiB2YXIoLS1tZGMtcmlwcGxlLWZnLXNpemUsIDEwMCUpOyB9XFxuICAubWRjLWljb24tYnV0dG9uOjpiZWZvcmUsIC5tZGMtaWNvbi1idXR0b246OmFmdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDsgfVxcbiAgLm1kYy1pY29uLWJ1dHRvbjpob3Zlcjo6YmVmb3JlIHtcXG4gICAgb3BhY2l0eTogMC4wNDsgfVxcbiAgLm1kYy1pY29uLWJ1dHRvbjpub3QoLm1kYy1yaXBwbGUtdXBncmFkZWQpOmZvY3VzOjpiZWZvcmUsIC5tZGMtaWNvbi1idXR0b24ubWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkOjpiZWZvcmUge1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiA3NW1zO1xcbiAgICBvcGFjaXR5OiAwLjEyOyB9XFxuICAubWRjLWljb24tYnV0dG9uOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6OmFmdGVyIHtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNTBtcyBsaW5lYXI7IH1cXG4gIC5tZGMtaWNvbi1idXR0b246bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTphY3RpdmU6OmFmdGVyIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNzVtcztcXG4gICAgb3BhY2l0eTogMC4xMjsgfVxcbiAgLm1kYy1pY29uLWJ1dHRvbi5tZGMtcmlwcGxlLXVwZ3JhZGVkIHtcXG4gICAgLS1tZGMtcmlwcGxlLWZnLW9wYWNpdHk6IDAuMTI7IH1cXG5cXG4ubWRjLWRyYXdlciB7XFxuICBib3JkZXItY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgYm9yZGVyLXJhZGl1czogMCAwIDAgMDtcXG4gIHotaW5kZXg6IDY7XFxuICB3aWR0aDogMjU2cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIGJvcmRlci1yaWdodC13aWR0aDogMXB4O1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgYm9yZGVyLXJpZ2h0LXN0eWxlOiBzb2xpZDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcbiAgLm1kYy1kcmF3ZXIgLm1kYy1kcmF3ZXJfX3RpdGxlIHtcXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7IH1cXG4gIC5tZGMtZHJhd2VyIC5tZGMtbGlzdC1ncm91cF9fc3ViaGVhZGVyIHtcXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTsgfVxcbiAgLm1kYy1kcmF3ZXIgLm1kYy1kcmF3ZXJfX3N1YnRpdGxlIHtcXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTsgfVxcbiAgLm1kYy1kcmF3ZXIgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpOyB9XFxuICAubWRjLWRyYXdlciAubWRjLWxpc3QtaXRlbSB7XFxuICAgIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpOyB9XFxuICAubWRjLWRyYXdlciAubWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkIC5tZGMtbGlzdC1pdGVtX19ncmFwaGljIHtcXG4gICAgY29sb3I6ICMwNDczYjg7IH1cXG4gIC5tZGMtZHJhd2VyIC5tZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQge1xcbiAgICBjb2xvcjogcmdiYSg0LCAxMTUsIDE4NCwgMC44Nyk7IH1cXG4gIFtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtZHJhd2VyLCAubWRjLWRyYXdlcltkaXI9XFxcInJ0bFxcXCJdIHtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMCAwOyB9XFxuICAubWRjLWRyYXdlciAubWRjLWxpc3QtaXRlbSB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDsgfVxcbiAgLm1kYy1kcmF3ZXIubWRjLWRyYXdlci0tb3Blbjpub3QoLm1kYy1kcmF3ZXItLWNsb3NpbmcpICsgLm1kYy1kcmF3ZXItYXBwLWNvbnRlbnQge1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1sZWZ0OiAyNTZweDtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7IH1cXG4gICAgW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy1kcmF3ZXIubWRjLWRyYXdlci0tb3Blbjpub3QoLm1kYy1kcmF3ZXItLWNsb3NpbmcpICsgLm1kYy1kcmF3ZXItYXBwLWNvbnRlbnQsIC5tZGMtZHJhd2VyLm1kYy1kcmF3ZXItLW9wZW46bm90KC5tZGMtZHJhd2VyLS1jbG9zaW5nKSArIC5tZGMtZHJhd2VyLWFwcC1jb250ZW50W2Rpcj1cXFwicnRsXFxcIl0ge1xcbiAgICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgICAvKiBAbm9mbGlwICovXFxuICAgICAgbWFyZ2luLXJpZ2h0OiAyNTZweDsgfVxcbiAgW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy1kcmF3ZXIsIC5tZGMtZHJhd2VyW2Rpcj1cXFwicnRsXFxcIl0ge1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIGJvcmRlci1yaWdodC13aWR0aDogMDtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBib3JkZXItbGVmdC13aWR0aDogMXB4O1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIGJvcmRlci1yaWdodC1zdHlsZTogbm9uZTtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBib3JkZXItbGVmdC1zdHlsZTogc29saWQ7IH1cXG4gIC5tZGMtZHJhd2VyIC5tZGMtbGlzdC1pdGVtIHtcXG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG4gICAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjM3NXJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMDA3MTRlbTtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogaW5oZXJpdDtcXG4gICAgaGVpZ2h0OiBjYWxjKDQ4cHggLSAyICogNHB4KTtcXG4gICAgbWFyZ2luOiA4cHggOHB4O1xcbiAgICBwYWRkaW5nOiAwIDhweDsgfVxcbiAgLm1kYy1kcmF3ZXIgLm1kYy1saXN0LWl0ZW06bnRoLWNoaWxkKDEpIHtcXG4gICAgbWFyZ2luLXRvcDogMnB4OyB9XFxuICAubWRjLWRyYXdlciAubWRjLWxpc3QtaXRlbTpudGgtbGFzdC1jaGlsZCgxKSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7IH1cXG4gIC5tZGMtZHJhd2VyIC5tZGMtbGlzdC1ncm91cF9fc3ViaGVhZGVyIHtcXG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG4gICAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMTc4NmVtO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgbWFyZ2luLXRvcDogMDtcXG4gICAgLyogQGFsdGVybmF0ZSAqL1xcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBhZGRpbmc6IDAgMTZweDsgfVxcbiAgICAubWRjLWRyYXdlciAubWRjLWxpc3QtZ3JvdXBfX3N1YmhlYWRlcjo6YmVmb3JlIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAyNHB4O1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiAwOyB9XFxuICAubWRjLWRyYXdlciAubWRjLWxpc3QtZGl2aWRlciB7XFxuICAgIG1hcmdpbjogM3B4IDAgNHB4IDA7IH1cXG4gIC5tZGMtZHJhd2VyIC5tZGMtbGlzdC1pdGVtX190ZXh0LFxcbiAgLm1kYy1kcmF3ZXIgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgfVxcblxcbi5tZGMtZHJhd2VyLS1hbmltYXRlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7IH1cXG4gIFtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtZHJhd2VyLS1hbmltYXRlLCAubWRjLWRyYXdlci0tYW5pbWF0ZVtkaXI9XFxcInJ0bFxcXCJdIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpOyB9XFxuXFxuLm1kYy1kcmF3ZXItLW9wZW5pbmcge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMjUwbXM7IH1cXG4gIFtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtZHJhd2VyLS1vcGVuaW5nLCAubWRjLWRyYXdlci0tb3BlbmluZ1tkaXI9XFxcInJ0bFxcXCJdIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApOyB9XFxuXFxuLm1kYy1kcmF3ZXItLWNsb3Npbmcge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDIwMG1zOyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWRyYXdlci0tY2xvc2luZywgLm1kYy1kcmF3ZXItLWNsb3NpbmdbZGlyPVxcXCJydGxcXFwiXSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTsgfVxcblxcbi5tZGMtZHJhd2VyX19oZWFkZXIge1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWluLWhlaWdodDogNjRweDtcXG4gIHBhZGRpbmc6IDAgMTZweCA0cHg7IH1cXG5cXG4ubWRjLWRyYXdlcl9fdGl0bGUge1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjAxMjVlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG4gIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIG1hcmdpbi1ib3R0b206IC0yMHB4OyB9XFxuICAubWRjLWRyYXdlcl9fdGl0bGU6OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMzZweDtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHZlcnRpY2FsLWFsaWduOiAwOyB9XFxuICAubWRjLWRyYXdlcl9fdGl0bGU6OmFmdGVyIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgdmVydGljYWwtYWxpZ246IC0yMHB4OyB9XFxuXFxuLm1kYy1kcmF3ZXJfX3N1YnRpdGxlIHtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICBmb250LXNpemU6IDAuODc1cmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuMjVyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDE3ODZlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG4gIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIG1hcmdpbi1ib3R0b206IDA7IH1cXG4gIC5tZGMtZHJhd2VyX19zdWJ0aXRsZTo6YmVmb3JlIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAyMHB4O1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgdmVydGljYWwtYWxpZ246IDA7IH1cXG5cXG4ubWRjLWRyYXdlcl9fY29udGVudCB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoOyB9XFxuXFxuLm1kYy1kcmF3ZXItLWRpc21pc3NpYmxlIHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIGxlZnQ6IDA7XFxuICAvKiBAbm9mbGlwICovXFxuICByaWdodDogaW5pdGlhbDtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7IH1cXG4gIFtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtZHJhd2VyLS1kaXNtaXNzaWJsZSwgLm1kYy1kcmF3ZXItLWRpc21pc3NpYmxlW2Rpcj1cXFwicnRsXFxcIl0ge1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIGxlZnQ6IGluaXRpYWw7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgcmlnaHQ6IDA7IH1cXG4gIC5tZGMtZHJhd2VyLS1kaXNtaXNzaWJsZS5tZGMtZHJhd2VyLS1vcGVuIHtcXG4gICAgZGlzcGxheTogZmxleDsgfVxcblxcbi5tZGMtZHJhd2VyLWFwcC1jb250ZW50IHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWRyYXdlci1hcHAtY29udGVudCwgLm1kYy1kcmF3ZXItYXBwLWNvbnRlbnRbZGlyPVxcXCJydGxcXFwiXSB7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuXFxuLm1kYy1kcmF3ZXItLW1vZGFsIHtcXG4gIGJveC1zaGFkb3c6IDBweCA4cHggMTBweCAtNXB4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMHB4IDE2cHggMjRweCAycHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMHB4IDZweCAzMHB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbGVmdDogMDtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIHJpZ2h0OiBpbml0aWFsO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDsgfVxcbiAgLm1kYy1kcmF3ZXItLW1vZGFsICsgLm1kYy1kcmF3ZXItc2NyaW0ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzIpOyB9XFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWRyYXdlci0tbW9kYWwsIC5tZGMtZHJhd2VyLS1tb2RhbFtkaXI9XFxcInJ0bFxcXCJdIHtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiBpbml0aWFsO1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIHJpZ2h0OiAwOyB9XFxuICAubWRjLWRyYXdlci0tbW9kYWwubWRjLWRyYXdlci0tb3BlbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4ubWRjLWRyYXdlci1zY3JpbSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgei1pbmRleDogNTtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTsgfVxcbiAgLm1kYy1kcmF3ZXItLW9wZW4gKyAubWRjLWRyYXdlci1zY3JpbSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAubWRjLWRyYXdlci0tYW5pbWF0ZSArIC5tZGMtZHJhd2VyLXNjcmltIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgLm1kYy1kcmF3ZXItLW9wZW5pbmcgKyAubWRjLWRyYXdlci1zY3JpbSB7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDI1MG1zO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICAubWRjLWRyYXdlci0tY2xvc2luZyArIC5tZGMtZHJhd2VyLXNjcmltIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMjAwbXM7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG5cXG4ubWRjLWxpc3Qge1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjc1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjAwOTM3ZW07XFxuICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxuICB0ZXh0LXRyYW5zZm9ybTogaW5oZXJpdDtcXG4gIC8qIEBhbHRlcm5hdGUgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjVyZW07XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiA4cHggMDtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgY29sb3I6IHZhcigtLW1kYy10aGVtZS10ZXh0LXByaW1hcnktb24tYmFja2dyb3VuZCwgcmdiYSgwLCAwLCAwLCAwLjg3KSk7IH1cXG4gIC5tZGMtbGlzdDpmb2N1cyB7XFxuICAgIG91dGxpbmU6IG5vbmU7IH1cXG5cXG4ubWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQge1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NCk7XFxuICAvKiBAYWx0ZXJuYXRlICovXFxuICBjb2xvcjogdmFyKC0tbWRjLXRoZW1lLXRleHQtc2Vjb25kYXJ5LW9uLWJhY2tncm91bmQsIHJnYmEoMCwgMCwgMCwgMC41NCkpOyB9XFxuXFxuLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IH1cXG5cXG4ubWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyB7XFxuICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjM4KTtcXG4gIC8qIEBhbHRlcm5hdGUgKi9cXG4gIGNvbG9yOiB2YXIoLS1tZGMtdGhlbWUtdGV4dC1pY29uLW9uLWJhY2tncm91bmQsIHJnYmEoMCwgMCwgMCwgMC4zOCkpOyB9XFxuXFxuLm1kYy1saXN0LWl0ZW1fX21ldGEge1xcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zOCk7XFxuICAvKiBAYWx0ZXJuYXRlICovXFxuICBjb2xvcjogdmFyKC0tbWRjLXRoZW1lLXRleHQtaGludC1vbi1iYWNrZ3JvdW5kLCByZ2JhKDAsIDAsIDAsIDAuMzgpKTsgfVxcblxcbi5tZGMtbGlzdC1ncm91cF9fc3ViaGVhZGVyIHtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODcpO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgY29sb3I6IHZhcigtLW1kYy10aGVtZS10ZXh0LXByaW1hcnktb24tYmFja2dyb3VuZCwgcmdiYSgwLCAwLCAwLCAwLjg3KSk7IH1cXG5cXG4ubWRjLWxpc3QtLWRlbnNlIHtcXG4gIHBhZGRpbmctdG9wOiA0cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogNHB4O1xcbiAgZm9udC1zaXplOiAuODEycmVtOyB9XFxuXFxuLm1kYy1saXN0LWl0ZW0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBoZWlnaHQ6IDQ4cHg7XFxuICBwYWRkaW5nOiAwIDE2cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAubWRjLWxpc3QtaXRlbTpmb2N1cyB7XFxuICAgIG91dGxpbmU6IG5vbmU7IH1cXG5cXG4ubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQsXFxuLm1kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZCB7XFxuICBjb2xvcjogIzA0NzNiODtcXG4gIC8qIEBhbHRlcm5hdGUgKi9cXG4gIGNvbG9yOiB2YXIoLS1tZGMtdGhlbWUtcHJpbWFyeSwgIzA0NzNiOCk7IH1cXG4gIC5tZGMtbGlzdC1pdGVtLS1zZWxlY3RlZCAubWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyxcXG4gIC5tZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgICBjb2xvcjogIzA0NzNiODtcXG4gICAgLyogQGFsdGVybmF0ZSAqL1xcbiAgICBjb2xvcjogdmFyKC0tbWRjLXRoZW1lLXByaW1hcnksICMwNDczYjgpOyB9XFxuXFxuLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkIHtcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzgpO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgY29sb3I6IHZhcigtLW1kYy10aGVtZS10ZXh0LWRpc2FibGVkLW9uLWJhY2tncm91bmQsIHJnYmEoMCwgMCwgMCwgMC4zOCkpOyB9XFxuXFxuLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxuICAvKiBAbm9mbGlwICovXFxuICBtYXJnaW4tcmlnaHQ6IDMycHg7XFxuICB3aWR0aDogMjRweDtcXG4gIGhlaWdodDogMjRweDtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmlsbDogY3VycmVudENvbG9yOyB9XFxuICAubWRjLWxpc3QtaXRlbVtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtbGlzdC1pdGVtX19ncmFwaGljLFxcbiAgW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy1saXN0LWl0ZW0gLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1sZWZ0OiAzMnB4O1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1yaWdodDogMDsgfVxcblxcbi5tZGMtbGlzdCAubWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDsgfVxcblxcbi5tZGMtbGlzdC1pdGVtX19tZXRhIHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuICAubWRjLWxpc3QtaXRlbV9fbWV0YTpub3QoLm1hdGVyaWFsLWljb25zKSB7XFxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XFxuICAgIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgICBmb250LXNpemU6IDAuNzVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjI1cmVtO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMzMzM2VtO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0OyB9XFxuICAubWRjLWxpc3QtaXRlbVtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtbGlzdC1pdGVtX19tZXRhLFxcbiAgW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy1saXN0LWl0ZW0gLm1kYy1saXN0LWl0ZW1fX21ldGEge1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1yaWdodDogYXV0bzsgfVxcblxcbi5tZGMtbGlzdC1pdGVtX190ZXh0IHtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4ubWRjLWxpc3QtaXRlbV9fdGV4dFtmb3JdIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XFxuXFxuLm1kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dCB7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIG1hcmdpbi1ib3R0b206IC0yMHB4O1xcbiAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5tZGMtbGlzdC1pdGVtX19wcmltYXJ5LXRleHQ6OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMzJweDtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHZlcnRpY2FsLWFsaWduOiAwOyB9XFxuICAubWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0OjphZnRlciB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHZlcnRpY2FsLWFsaWduOiAtMjBweDsgfVxcbiAgLm1kYy1saXN0LS1kZW5zZSAubWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG1hcmdpbi10b3A6IDA7XFxuICAgIC8qIEBhbHRlcm5hdGUgKi9cXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gICAgbWFyZ2luLWJvdHRvbTogLTIwcHg7IH1cXG4gICAgLm1kYy1saXN0LS1kZW5zZSAubWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0OjpiZWZvcmUge1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDI0cHg7XFxuICAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICAgdmVydGljYWwtYWxpZ246IDA7IH1cXG4gICAgLm1kYy1saXN0LS1kZW5zZSAubWRjLWxpc3QtaXRlbV9fcHJpbWFyeS10ZXh0OjphZnRlciB7XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMjBweDtcXG4gICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogLTIwcHg7IH1cXG5cXG4ubWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQge1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XFxuICBsaW5lLWhlaWdodDogMS4yNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wMTc4NmVtO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xcbiAgdGV4dC10cmFuc2Zvcm06IGluaGVyaXQ7XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAwO1xcbiAgLyogQGFsdGVybmF0ZSAqL1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAubWRjLWxpc3QtaXRlbV9fc2Vjb25kYXJ5LXRleHQ6OmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMjBweDtcXG4gICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgIHZlcnRpY2FsLWFsaWduOiAwOyB9XFxuICAubWRjLWxpc3QtLWRlbnNlIC5tZGMtbGlzdC1pdGVtX19zZWNvbmRhcnktdGV4dCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBtYXJnaW4tdG9wOiAwO1xcbiAgICAvKiBAYWx0ZXJuYXRlICovXFxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDsgfVxcbiAgICAubWRjLWxpc3QtLWRlbnNlIC5tZGMtbGlzdC1pdGVtX19zZWNvbmRhcnktdGV4dDo6YmVmb3JlIHtcXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAyMHB4O1xcbiAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiAwOyB9XFxuXFxuLm1kYy1saXN0LS1kZW5zZSAubWRjLWxpc3QtaXRlbSB7XFxuICBoZWlnaHQ6IDQwcHg7IH1cXG5cXG4ubWRjLWxpc3QtLWRlbnNlIC5tZGMtbGlzdC1pdGVtX19ncmFwaGljIHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbWFyZ2luLXJpZ2h0OiAzNnB4O1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7IH1cXG4gIC5tZGMtbGlzdC1pdGVtW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy1saXN0LS1kZW5zZSAubWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyxcXG4gIFtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtbGlzdC1pdGVtIC5tZGMtbGlzdC0tZGVuc2UgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMge1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1sZWZ0OiAzNnB4O1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIG1hcmdpbi1yaWdodDogMDsgfVxcblxcbi5tZGMtbGlzdC0tYXZhdGFyLWxpc3QgLm1kYy1saXN0LWl0ZW0ge1xcbiAgaGVpZ2h0OiA1NnB4OyB9XFxuXFxuLm1kYy1saXN0LS1hdmF0YXItbGlzdCAubWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyB7XFxuICAvKiBAbm9mbGlwICovXFxuICBtYXJnaW4tbGVmdDogMDtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIG1hcmdpbi1yaWdodDogMTZweDtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlOyB9XFxuICAubWRjLWxpc3QtaXRlbVtkaXI9XFxcInJ0bFxcXCJdIC5tZGMtbGlzdC0tYXZhdGFyLWxpc3QgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMsXFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWxpc3QtaXRlbSAubWRjLWxpc3QtLWF2YXRhci1saXN0IC5tZGMtbGlzdC1pdGVtX19ncmFwaGljIHtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBtYXJnaW4tbGVmdDogMTZweDtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBtYXJnaW4tcmlnaHQ6IDA7IH1cXG5cXG4ubWRjLWxpc3QtLXR3by1saW5lIC5tZGMtbGlzdC1pdGVtX190ZXh0IHtcXG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7IH1cXG5cXG4ubWRjLWxpc3QtLXR3by1saW5lIC5tZGMtbGlzdC1pdGVtIHtcXG4gIGhlaWdodDogNzJweDsgfVxcblxcbi5tZGMtbGlzdC0tdHdvLWxpbmUubWRjLWxpc3QtLWRlbnNlIC5tZGMtbGlzdC1pdGVtLFxcbi5tZGMtbGlzdC0tYXZhdGFyLWxpc3QubWRjLWxpc3QtLWRlbnNlIC5tZGMtbGlzdC1pdGVtIHtcXG4gIGhlaWdodDogNjBweDsgfVxcblxcbi5tZGMtbGlzdC0tYXZhdGFyLWxpc3QubWRjLWxpc3QtLWRlbnNlIC5tZGMtbGlzdC1pdGVtX19ncmFwaGljIHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgd2lkdGg6IDM2cHg7XFxuICBoZWlnaHQ6IDM2cHg7IH1cXG4gIC5tZGMtbGlzdC1pdGVtW2Rpcj1cXFwicnRsXFxcIl0gLm1kYy1saXN0LS1hdmF0YXItbGlzdC5tZGMtbGlzdC0tZGVuc2UgLm1kYy1saXN0LWl0ZW1fX2dyYXBoaWMsXFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWxpc3QtaXRlbSAubWRjLWxpc3QtLWF2YXRhci1saXN0Lm1kYy1saXN0LS1kZW5zZSAubWRjLWxpc3QtaXRlbV9fZ3JhcGhpYyB7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbWFyZ2luLXJpZ2h0OiAwOyB9XFxuXFxuOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG5hLm1kYy1saXN0LWl0ZW0ge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG5cXG4ubWRjLWxpc3QtZGl2aWRlciB7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7XFxuICBib3JkZXItYm90dG9tLXN0eWxlOiBzb2xpZDsgfVxcblxcbi5tZGMtbGlzdC1kaXZpZGVyIHtcXG4gIGJvcmRlci1ib3R0b20tY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xMik7IH1cXG5cXG4ubWRjLWxpc3QtZGl2aWRlci0tcGFkZGVkIHtcXG4gIG1hcmdpbjogMCAxNnB4OyB9XFxuXFxuLm1kYy1saXN0LWRpdmlkZXItLWluc2V0IHtcXG4gIC8qIEBub2ZsaXAgKi9cXG4gIG1hcmdpbi1sZWZ0OiA3MnB4O1xcbiAgLyogQG5vZmxpcCAqL1xcbiAgbWFyZ2luLXJpZ2h0OiAwO1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDcycHgpOyB9XFxuICAubWRjLWxpc3QtZ3JvdXBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWxpc3QtZGl2aWRlci0taW5zZXQsXFxuICBbZGlyPVxcXCJydGxcXFwiXSAubWRjLWxpc3QtZ3JvdXAgLm1kYy1saXN0LWRpdmlkZXItLWluc2V0IHtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBtYXJnaW4tcmlnaHQ6IDcycHg7IH1cXG5cXG4ubWRjLWxpc3QtZGl2aWRlci0taW5zZXQubWRjLWxpc3QtZGl2aWRlci0tcGFkZGVkIHtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA3MnB4IC0gMTZweCk7IH1cXG5cXG4ubWRjLWxpc3QtZ3JvdXAgLm1kYy1saXN0IHtcXG4gIHBhZGRpbmc6IDA7IH1cXG5cXG4ubWRjLWxpc3QtZ3JvdXBfX3N1YmhlYWRlciB7XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgbGluZS1oZWlnaHQ6IDEuNzVyZW07XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDA5MzdlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG4gIHRleHQtdHJhbnNmb3JtOiBpbmhlcml0O1xcbiAgbWFyZ2luOiAwLjc1cmVtIDE2cHg7IH1cXG5cXG46bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtIHtcXG4gIC0tbWRjLXJpcHBsZS1mZy1zaXplOiAwO1xcbiAgLS1tZGMtcmlwcGxlLWxlZnQ6IDA7XFxuICAtLW1kYy1yaXBwbGUtdG9wOiAwO1xcbiAgLS1tZGMtcmlwcGxlLWZnLXNjYWxlOiAxO1xcbiAgLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQ6IDA7XFxuICAtLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0OiAwO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtOjpiZWZvcmUsIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW06OmFmdGVyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbTo6YmVmb3JlIHtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNW1zIGxpbmVhciwgYmFja2dyb3VuZC1jb2xvciAxNW1zIGxpbmVhcjtcXG4gICAgei1pbmRleDogMTsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS5tZGMtcmlwcGxlLXVwZ3JhZGVkOjpiZWZvcmUge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKHZhcigtLW1kYy1yaXBwbGUtZmctc2NhbGUsIDEpKTsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS5tZGMtcmlwcGxlLXVwZ3JhZGVkOjphZnRlciB7XFxuICAgIHRvcDogMDtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLm1kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZDo6YWZ0ZXIge1xcbiAgICB0b3A6IHZhcigtLW1kYy1yaXBwbGUtdG9wLCAwKTtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiB2YXIoLS1tZGMtcmlwcGxlLWxlZnQsIDApOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLm1kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbjo6YWZ0ZXIge1xcbiAgICBhbmltYXRpb246IG1kYy1yaXBwbGUtZmctcmFkaXVzLWluIDIyNW1zIGZvcndhcmRzLCBtZGMtcmlwcGxlLWZnLW9wYWNpdHktaW4gNzVtcyBmb3J3YXJkczsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS5tZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbjo6YWZ0ZXIge1xcbiAgICBhbmltYXRpb246IG1kYy1yaXBwbGUtZmctb3BhY2l0eS1vdXQgMTUwbXM7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKHZhcigtLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCwgMCkpIHNjYWxlKHZhcigtLW1kYy1yaXBwbGUtZmctc2NhbGUsIDEpKTsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbTo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtOjphZnRlciB7XFxuICAgIHRvcDogY2FsYyg1MCUgLSAxMDAlKTtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiBjYWxjKDUwJSAtIDEwMCUpO1xcbiAgICB3aWR0aDogMjAwJTtcXG4gICAgaGVpZ2h0OiAyMDAlOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLm1kYy1yaXBwbGUtdXBncmFkZWQ6OmFmdGVyIHtcXG4gICAgd2lkdGg6IHZhcigtLW1kYy1yaXBwbGUtZmctc2l6ZSwgMTAwJSk7XFxuICAgIGhlaWdodDogdmFyKC0tbWRjLXJpcHBsZS1mZy1zaXplLCAxMDAlKTsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbTo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtOjphZnRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW06aG92ZXI6OmJlZm9yZSB7XFxuICAgIG9wYWNpdHk6IDAuMDQ7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW06bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTpmb2N1czo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLm1kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZDo6YmVmb3JlIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNzVtcztcXG4gICAgb3BhY2l0eTogMC4xMjsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbTpub3QoLm1kYy1yaXBwbGUtdXBncmFkZWQpOjphZnRlciB7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMTUwbXMgbGluZWFyOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6YWN0aXZlOjphZnRlciB7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDc1bXM7XFxuICAgIG9wYWNpdHk6IDAuMTI7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW0ubWRjLXJpcHBsZS11cGdyYWRlZCB7XFxuICAgIC0tbWRjLXJpcHBsZS1mZy1vcGFjaXR5OiAwLjEyOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQ6OmJlZm9yZSB7XFxuICAgIG9wYWNpdHk6IDAuMTI7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZDo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQ6OmFmdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA0NzNiODsgfVxcbiAgICBAc3VwcG9ydHMgbm90ICgtbXMtaW1lLWFsaWduOiBhdXRvKSB7XFxuICAgICAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkOjpiZWZvcmUsIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZDo6YWZ0ZXIge1xcbiAgICAgICAgLyogQGFsdGVybmF0ZSAqL1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWRjLXRoZW1lLXByaW1hcnksICMwNDczYjgpOyB9IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZDpob3Zlcjo6YmVmb3JlIHtcXG4gICAgb3BhY2l0eTogMC4xNjsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6Zm9jdXM6OmJlZm9yZSwgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkLm1kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZDo6YmVmb3JlIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNzVtcztcXG4gICAgb3BhY2l0eTogMC4yNDsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tYWN0aXZhdGVkOm5vdCgubWRjLXJpcHBsZS11cGdyYWRlZCk6OmFmdGVyIHtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNTBtcyBsaW5lYXI7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gOm5vdCgubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQpLm1kYy1saXN0LWl0ZW0tLWFjdGl2YXRlZDpub3QoLm1kYy1yaXBwbGUtdXBncmFkZWQpOmFjdGl2ZTo6YWZ0ZXIge1xcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiA3NW1zO1xcbiAgICBvcGFjaXR5OiAwLjI0OyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1hY3RpdmF0ZWQubWRjLXJpcHBsZS11cGdyYWRlZCB7XFxuICAgIC0tbWRjLXJpcHBsZS1mZy1vcGFjaXR5OiAwLjI0OyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1zZWxlY3RlZDo6YmVmb3JlIHtcXG4gICAgb3BhY2l0eTogMC4wODsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6OmJlZm9yZSwgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6OmFmdGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzA0NzNiODsgfVxcbiAgICBAc3VwcG9ydHMgbm90ICgtbXMtaW1lLWFsaWduOiBhdXRvKSB7XFxuICAgICAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6OmJlZm9yZSwgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6OmFmdGVyIHtcXG4gICAgICAgIC8qIEBhbHRlcm5hdGUgKi9cXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1kYy10aGVtZS1wcmltYXJ5LCAjMDQ3M2I4KTsgfSB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1zZWxlY3RlZDpob3Zlcjo6YmVmb3JlIHtcXG4gICAgb3BhY2l0eTogMC4xMjsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTpmb2N1czo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1zZWxlY3RlZC5tZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6OmJlZm9yZSB7XFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDc1bXM7XFxuICAgIG9wYWNpdHk6IDAuMjsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTo6YWZ0ZXIge1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE1MG1zIGxpbmVhcjsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiA6bm90KC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZCkubWRjLWxpc3QtaXRlbS0tc2VsZWN0ZWQ6bm90KC5tZGMtcmlwcGxlLXVwZ3JhZGVkKTphY3RpdmU6OmFmdGVyIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNzVtcztcXG4gICAgb3BhY2l0eTogMC4yOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IDpub3QoLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkKS5tZGMtbGlzdC1pdGVtLS1zZWxlY3RlZC5tZGMtcmlwcGxlLXVwZ3JhZGVkIHtcXG4gICAgLS1tZGMtcmlwcGxlLWZnLW9wYWNpdHk6IDAuMjsgfVxcblxcbjpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkIHtcXG4gIC0tbWRjLXJpcHBsZS1mZy1zaXplOiAwO1xcbiAgLS1tZGMtcmlwcGxlLWxlZnQ6IDA7XFxuICAtLW1kYy1yaXBwbGUtdG9wOiAwO1xcbiAgLS1tZGMtcmlwcGxlLWZnLXNjYWxlOiAxO1xcbiAgLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQ6IDA7XFxuICAtLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0OiAwO1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YWZ0ZXIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIGNvbnRlbnQ6IFxcXCJcXFwiOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YmVmb3JlIHtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAxNW1zIGxpbmVhciwgYmFja2dyb3VuZC1jb2xvciAxNW1zIGxpbmVhcjtcXG4gICAgei1pbmRleDogMTsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiAubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQubWRjLXJpcHBsZS11cGdyYWRlZDo6YmVmb3JlIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSh2YXIoLS1tZGMtcmlwcGxlLWZnLXNjYWxlLCAxKSk7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkLm1kYy1yaXBwbGUtdXBncmFkZWQ6OmFmdGVyIHtcXG4gICAgdG9wOiAwO1xcbiAgICAvKiBAbm9mbGlwICovXFxuICAgIGxlZnQ6IDA7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkLm1kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZDo6YWZ0ZXIge1xcbiAgICB0b3A6IHZhcigtLW1kYy1yaXBwbGUtdG9wLCAwKTtcXG4gICAgLyogQG5vZmxpcCAqL1xcbiAgICBsZWZ0OiB2YXIoLS1tZGMtcmlwcGxlLWxlZnQsIDApOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZC5tZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb246OmFmdGVyIHtcXG4gICAgYW5pbWF0aW9uOiBtZGMtcmlwcGxlLWZnLXJhZGl1cy1pbiAyMjVtcyBmb3J3YXJkcywgbWRjLXJpcHBsZS1mZy1vcGFjaXR5LWluIDc1bXMgZm9yd2FyZHM7IH1cXG4gIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkLm1kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uOjphZnRlciB7XFxuICAgIGFuaW1hdGlvbjogbWRjLXJpcHBsZS1mZy1vcGFjaXR5LW91dCAxNTBtcztcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUodmFyKC0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kLCAwKSkgc2NhbGUodmFyKC0tbWRjLXJpcHBsZS1mZy1zY2FsZSwgMSkpOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YWZ0ZXIge1xcbiAgICB0b3A6IGNhbGMoNTAlIC0gMTAwJSk7XFxuICAgIC8qIEBub2ZsaXAgKi9cXG4gICAgbGVmdDogY2FsYyg1MCUgLSAxMDAlKTtcXG4gICAgd2lkdGg6IDIwMCU7XFxuICAgIGhlaWdodDogMjAwJTsgfVxcbiAgOm5vdCgubWRjLWxpc3QtLW5vbi1pbnRlcmFjdGl2ZSkgPiAubWRjLWxpc3QtaXRlbS0tZGlzYWJsZWQubWRjLXJpcHBsZS11cGdyYWRlZDo6YWZ0ZXIge1xcbiAgICB3aWR0aDogdmFyKC0tbWRjLXJpcHBsZS1mZy1zaXplLCAxMDAlKTtcXG4gICAgaGVpZ2h0OiB2YXIoLS1tZGMtcmlwcGxlLWZnLXNpemUsIDEwMCUpOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YmVmb3JlLCA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDo6YWZ0ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwOyB9XFxuICA6bm90KC5tZGMtbGlzdC0tbm9uLWludGVyYWN0aXZlKSA+IC5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZDpub3QoLm1kYy1yaXBwbGUtdXBncmFkZWQpOmZvY3VzOjpiZWZvcmUsIDpub3QoLm1kYy1saXN0LS1ub24taW50ZXJhY3RpdmUpID4gLm1kYy1saXN0LWl0ZW0tLWRpc2FibGVkLm1kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZDo6YmVmb3JlIHtcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNzVtcztcXG4gICAgb3BhY2l0eTogMC4xMjsgfVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAwdmg7IH1cXG5cXG4ubWRjLWRyYXdlci1hcHAtY29udGVudCB7XFxuICBmbGV4OiBhdXRvO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4ubWFpbi1jb250ZW50IHtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuLmFwcC1iYXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlOyB9XFxuXFxuLm1kYy10b3AtYXBwLWJhciB7XFxuICB6LWluZGV4OiA3OyB9XFxuXCIsIFwiXCJdKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLypcclxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XHJcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cclxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XHJcblxyXG4gICAgICBpZiAoaXRlbVsyXSkge1xyXG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCJ7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSkuam9pbignJyk7XHJcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xyXG5cclxuXHJcbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXHJcbiAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblxyXG4gICAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbX2ldOyAvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuICAgICAgLy8gSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cclxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG4gICAgICAgIGlmIChtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcclxuICAgICAgICAgIGl0ZW1bMl0gPSBcIihcIi5jb25jYXQoaXRlbVsyXSwgXCIpIGFuZCAoXCIpLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIilcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gbGlzdDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XHJcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcclxuXHJcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xyXG5cclxuICBpZiAoIWNzc01hcHBpbmcpIHtcclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuXHJcbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XHJcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XHJcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcclxuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XHJcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcclxufSIsInZhciB0YWJiYWJsZSA9IHJlcXVpcmUoJ3RhYmJhYmxlJyk7XHJcbnZhciB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyk7XHJcblxyXG52YXIgYWN0aXZlRm9jdXNEZWxheTtcclxuXHJcbnZhciBhY3RpdmVGb2N1c1RyYXBzID0gKGZ1bmN0aW9uKCkge1xyXG4gIHZhciB0cmFwUXVldWUgPSBbXTtcclxuICByZXR1cm4ge1xyXG4gICAgYWN0aXZhdGVUcmFwOiBmdW5jdGlvbih0cmFwKSB7XHJcbiAgICAgIGlmICh0cmFwUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBhY3RpdmVUcmFwID0gdHJhcFF1ZXVlW3RyYXBRdWV1ZS5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAoYWN0aXZlVHJhcCAhPT0gdHJhcCkge1xyXG4gICAgICAgICAgYWN0aXZlVHJhcC5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHRyYXBJbmRleCA9IHRyYXBRdWV1ZS5pbmRleE9mKHRyYXApO1xyXG4gICAgICBpZiAodHJhcEluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRyYXBRdWV1ZS5wdXNoKHRyYXApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG1vdmUgdGhpcyBleGlzdGluZyB0cmFwIHRvIHRoZSBmcm9udCBvZiB0aGUgcXVldWVcclxuICAgICAgICB0cmFwUXVldWUuc3BsaWNlKHRyYXBJbmRleCwgMSk7XHJcbiAgICAgICAgdHJhcFF1ZXVlLnB1c2godHJhcCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVhY3RpdmF0ZVRyYXA6IGZ1bmN0aW9uKHRyYXApIHtcclxuICAgICAgdmFyIHRyYXBJbmRleCA9IHRyYXBRdWV1ZS5pbmRleE9mKHRyYXApO1xyXG4gICAgICBpZiAodHJhcEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIHRyYXBRdWV1ZS5zcGxpY2UodHJhcEluZGV4LCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRyYXBRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdHJhcFF1ZXVlW3RyYXBRdWV1ZS5sZW5ndGggLSAxXS51bnBhdXNlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gZm9jdXNUcmFwKGVsZW1lbnQsIHVzZXJPcHRpb25zKSB7XHJcbiAgdmFyIGRvYyA9IGRvY3VtZW50O1xyXG4gIHZhciBjb250YWluZXIgPVxyXG4gICAgdHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnID8gZG9jLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkgOiBlbGVtZW50O1xyXG5cclxuICB2YXIgY29uZmlnID0geHRlbmQoXHJcbiAgICB7XHJcbiAgICAgIHJldHVybkZvY3VzT25EZWFjdGl2YXRlOiB0cnVlLFxyXG4gICAgICBlc2NhcGVEZWFjdGl2YXRlczogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHVzZXJPcHRpb25zXHJcbiAgKTtcclxuXHJcbiAgdmFyIHN0YXRlID0ge1xyXG4gICAgZmlyc3RUYWJiYWJsZU5vZGU6IG51bGwsXHJcbiAgICBsYXN0VGFiYmFibGVOb2RlOiBudWxsLFxyXG4gICAgbm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uOiBudWxsLFxyXG4gICAgbW9zdFJlY2VudGx5Rm9jdXNlZE5vZGU6IG51bGwsXHJcbiAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgcGF1c2VkOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIHZhciB0cmFwID0ge1xyXG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlLFxyXG4gICAgZGVhY3RpdmF0ZTogZGVhY3RpdmF0ZSxcclxuICAgIHBhdXNlOiBwYXVzZSxcclxuICAgIHVucGF1c2U6IHVucGF1c2VcclxuICB9O1xyXG5cclxuICByZXR1cm4gdHJhcDtcclxuXHJcbiAgZnVuY3Rpb24gYWN0aXZhdGUoYWN0aXZhdGVPcHRpb25zKSB7XHJcbiAgICBpZiAoc3RhdGUuYWN0aXZlKSByZXR1cm47XHJcblxyXG4gICAgdXBkYXRlVGFiYmFibGVOb2RlcygpO1xyXG5cclxuICAgIHN0YXRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICBzdGF0ZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgIHN0YXRlLm5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbiA9IGRvYy5hY3RpdmVFbGVtZW50O1xyXG5cclxuICAgIHZhciBvbkFjdGl2YXRlID1cclxuICAgICAgYWN0aXZhdGVPcHRpb25zICYmIGFjdGl2YXRlT3B0aW9ucy5vbkFjdGl2YXRlXHJcbiAgICAgICAgPyBhY3RpdmF0ZU9wdGlvbnMub25BY3RpdmF0ZVxyXG4gICAgICAgIDogY29uZmlnLm9uQWN0aXZhdGU7XHJcbiAgICBpZiAob25BY3RpdmF0ZSkge1xyXG4gICAgICBvbkFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTGlzdGVuZXJzKCk7XHJcbiAgICByZXR1cm4gdHJhcDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYWN0aXZhdGUoZGVhY3RpdmF0ZU9wdGlvbnMpIHtcclxuICAgIGlmICghc3RhdGUuYWN0aXZlKSByZXR1cm47XHJcblxyXG4gICAgY2xlYXJUaW1lb3V0KGFjdGl2ZUZvY3VzRGVsYXkpO1xyXG5cclxuICAgIHJlbW92ZUxpc3RlbmVycygpO1xyXG4gICAgc3RhdGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICBzdGF0ZS5wYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICBhY3RpdmVGb2N1c1RyYXBzLmRlYWN0aXZhdGVUcmFwKHRyYXApO1xyXG5cclxuICAgIHZhciBvbkRlYWN0aXZhdGUgPVxyXG4gICAgICBkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5vbkRlYWN0aXZhdGUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gZGVhY3RpdmF0ZU9wdGlvbnMub25EZWFjdGl2YXRlXHJcbiAgICAgICAgOiBjb25maWcub25EZWFjdGl2YXRlO1xyXG4gICAgaWYgKG9uRGVhY3RpdmF0ZSkge1xyXG4gICAgICBvbkRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcmV0dXJuRm9jdXMgPVxyXG4gICAgICBkZWFjdGl2YXRlT3B0aW9ucyAmJiBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1cyAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgPyBkZWFjdGl2YXRlT3B0aW9ucy5yZXR1cm5Gb2N1c1xyXG4gICAgICAgIDogY29uZmlnLnJldHVybkZvY3VzT25EZWFjdGl2YXRlO1xyXG4gICAgaWYgKHJldHVybkZvY3VzKSB7XHJcbiAgICAgIGRlbGF5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRyeUZvY3VzKHN0YXRlLm5vZGVGb2N1c2VkQmVmb3JlQWN0aXZhdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cmFwO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGF1c2UoKSB7XHJcbiAgICBpZiAoc3RhdGUucGF1c2VkIHx8ICFzdGF0ZS5hY3RpdmUpIHJldHVybjtcclxuICAgIHN0YXRlLnBhdXNlZCA9IHRydWU7XHJcbiAgICByZW1vdmVMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVucGF1c2UoKSB7XHJcbiAgICBpZiAoIXN0YXRlLnBhdXNlZCB8fCAhc3RhdGUuYWN0aXZlKSByZXR1cm47XHJcbiAgICBzdGF0ZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcclxuICAgIGFkZExpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xyXG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUpIHJldHVybjtcclxuXHJcbiAgICAvLyBUaGVyZSBjYW4gYmUgb25seSBvbmUgbGlzdGVuaW5nIGZvY3VzIHRyYXAgYXQgYSB0aW1lXHJcbiAgICBhY3RpdmVGb2N1c1RyYXBzLmFjdGl2YXRlVHJhcCh0cmFwKTtcclxuXHJcbiAgICAvLyBEZWxheSBlbnN1cmVzIHRoYXQgdGhlIGZvY3VzZWQgZWxlbWVudCBkb2Vzbid0IGNhcHR1cmUgdGhlIGV2ZW50XHJcbiAgICAvLyB0aGF0IGNhdXNlZCB0aGUgZm9jdXMgdHJhcCBhY3RpdmF0aW9uLlxyXG4gICAgYWN0aXZlRm9jdXNEZWxheSA9IGRlbGF5KGZ1bmN0aW9uKCkge1xyXG4gICAgICB0cnlGb2N1cyhnZXRJbml0aWFsRm9jdXNOb2RlKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCBjaGVja0ZvY3VzSW4sIHRydWUpO1xyXG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHtcclxuICAgICAgY2FwdHVyZTogdHJ1ZSxcclxuICAgICAgcGFzc2l2ZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBjaGVja1BvaW50ZXJEb3duLCB7XHJcbiAgICAgIGNhcHR1cmU6IHRydWUsXHJcbiAgICAgIHBhc3NpdmU6IGZhbHNlXHJcbiAgICB9KTtcclxuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2ssIHtcclxuICAgICAgY2FwdHVyZTogdHJ1ZSxcclxuICAgICAgcGFzc2l2ZTogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwge1xyXG4gICAgICBjYXB0dXJlOiB0cnVlLFxyXG4gICAgICBwYXNzaXZlOiBmYWxzZVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRyYXA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XHJcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSkgcmV0dXJuO1xyXG5cclxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1c2luJywgY2hlY2tGb2N1c0luLCB0cnVlKTtcclxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBjaGVja1BvaW50ZXJEb3duLCB0cnVlKTtcclxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0NsaWNrLCB0cnVlKTtcclxuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2hlY2tLZXksIHRydWUpO1xyXG5cclxuICAgIHJldHVybiB0cmFwO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Tm9kZUZvck9wdGlvbihvcHRpb25OYW1lKSB7XHJcbiAgICB2YXIgb3B0aW9uVmFsdWUgPSBjb25maWdbb3B0aW9uTmFtZV07XHJcbiAgICB2YXIgbm9kZSA9IG9wdGlvblZhbHVlO1xyXG4gICAgaWYgKCFvcHRpb25WYWx1ZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9uVmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIG5vZGUgPSBkb2MucXVlcnlTZWxlY3RvcihvcHRpb25WYWx1ZSk7XHJcbiAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYCcgKyBvcHRpb25OYW1lICsgJ2AgcmVmZXJzIHRvIG5vIGtub3duIG5vZGUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBub2RlID0gb3B0aW9uVmFsdWUoKTtcclxuICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgJyArIG9wdGlvbk5hbWUgKyAnYCBkaWQgbm90IHJldHVybiBhIG5vZGUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRJbml0aWFsRm9jdXNOb2RlKCkge1xyXG4gICAgdmFyIG5vZGU7XHJcbiAgICBpZiAoZ2V0Tm9kZUZvck9wdGlvbignaW5pdGlhbEZvY3VzJykgIT09IG51bGwpIHtcclxuICAgICAgbm9kZSA9IGdldE5vZGVGb3JPcHRpb24oJ2luaXRpYWxGb2N1cycpO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXIuY29udGFpbnMoZG9jLmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgIG5vZGUgPSBkb2MuYWN0aXZlRWxlbWVudDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5vZGUgPSBzdGF0ZS5maXJzdFRhYmJhYmxlTm9kZSB8fCBnZXROb2RlRm9yT3B0aW9uKCdmYWxsYmFja0ZvY3VzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFub2RlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBcIllvdSBjYW4ndCBoYXZlIGEgZm9jdXMtdHJhcCB3aXRob3V0IGF0IGxlYXN0IG9uZSBmb2N1c2FibGUgZWxlbWVudFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcbiAgfVxyXG5cclxuICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgb24gbW91c2Vkb3duIGFuZCB0b3VjaHN0YXJ0IGluc3RlYWQgb2YgY2xpY2tcclxuICAvLyBzbyB0aGF0IGl0IHByZWNlZGVzIHRoZSBmb2N1cyBldmVudC5cclxuICBmdW5jdGlvbiBjaGVja1BvaW50ZXJEb3duKGUpIHtcclxuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpKSByZXR1cm47XHJcbiAgICBpZiAoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzKSB7XHJcbiAgICAgIGRlYWN0aXZhdGUoe1xyXG4gICAgICAgIHJldHVybkZvY3VzOiAhdGFiYmFibGUuaXNGb2N1c2FibGUoZS50YXJnZXQpXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBUaGlzIGlzIG5lZWRlZCBmb3IgbW9iaWxlIGRldmljZXMuXHJcbiAgICAvLyAoSWYgd2UnbGwgb25seSBsZXQgYGNsaWNrYCBldmVudHMgdGhyb3VnaCxcclxuICAgIC8vIHRoZW4gb24gbW9iaWxlIHRoZXkgd2lsbCBiZSBibG9ja2VkIGFueXdheXMgaWYgYHRvdWNoc3RhcnRgIGlzIGJsb2NrZWQuKVxyXG4gICAgaWYgKGNvbmZpZy5hbGxvd091dHNpZGVDbGljayAmJiBjb25maWcuYWxsb3dPdXRzaWRlQ2xpY2soZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gSW4gY2FzZSBmb2N1cyBlc2NhcGVzIHRoZSB0cmFwIGZvciBzb21lIHN0cmFuZ2UgcmVhc29uLCBwdWxsIGl0IGJhY2sgaW4uXHJcbiAgZnVuY3Rpb24gY2hlY2tGb2N1c0luKGUpIHtcclxuICAgIC8vIEluIEZpcmVmb3ggd2hlbiB5b3UgVGFiIG91dCBvZiBhbiBpZnJhbWUgdGhlIERvY3VtZW50IGlzIGJyaWVmbHkgZm9jdXNlZC5cclxuICAgIGlmIChjb250YWluZXIuY29udGFpbnMoZS50YXJnZXQpIHx8IGUudGFyZ2V0IGluc3RhbmNlb2YgRG9jdW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIHRyeUZvY3VzKHN0YXRlLm1vc3RSZWNlbnRseUZvY3VzZWROb2RlIHx8IGdldEluaXRpYWxGb2N1c05vZGUoKSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGVja0tleShlKSB7XHJcbiAgICBpZiAoY29uZmlnLmVzY2FwZURlYWN0aXZhdGVzICE9PSBmYWxzZSAmJiBpc0VzY2FwZUV2ZW50KGUpKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZGVhY3RpdmF0ZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNUYWJFdmVudChlKSkge1xyXG4gICAgICBjaGVja1RhYihlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gSGlqYWNrIFRhYiBldmVudHMgb24gdGhlIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBub2RlcyBvZiB0aGUgdHJhcCxcclxuICAvLyBpbiBvcmRlciB0byBwcmV2ZW50IGZvY3VzIGZyb20gZXNjYXBpbmcuIElmIGl0IGVzY2FwZXMgZm9yIGV2ZW4gYVxyXG4gIC8vIG1vbWVudCBpdCBjYW4gZW5kIHVwIHNjcm9sbGluZyB0aGUgcGFnZSBhbmQgY2F1c2luZyBjb25mdXNpb24gc28gd2VcclxuICAvLyBraW5kIG9mIG5lZWQgdG8gY2FwdHVyZSB0aGUgYWN0aW9uIGF0IHRoZSBrZXlkb3duIHBoYXNlLlxyXG4gIGZ1bmN0aW9uIGNoZWNrVGFiKGUpIHtcclxuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcclxuICAgIGlmIChlLnNoaWZ0S2V5ICYmIGUudGFyZ2V0ID09PSBzdGF0ZS5maXJzdFRhYmJhYmxlTm9kZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRyeUZvY3VzKHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIWUuc2hpZnRLZXkgJiYgZS50YXJnZXQgPT09IHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0cnlGb2N1cyhzdGF0ZS5maXJzdFRhYmJhYmxlTm9kZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrQ2xpY2soZSkge1xyXG4gICAgaWYgKGNvbmZpZy5jbGlja091dHNpZGVEZWFjdGl2YXRlcykgcmV0dXJuO1xyXG4gICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHJldHVybjtcclxuICAgIGlmIChjb25maWcuYWxsb3dPdXRzaWRlQ2xpY2sgJiYgY29uZmlnLmFsbG93T3V0c2lkZUNsaWNrKGUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVUYWJiYWJsZU5vZGVzKCkge1xyXG4gICAgdmFyIHRhYmJhYmxlTm9kZXMgPSB0YWJiYWJsZShjb250YWluZXIpO1xyXG4gICAgc3RhdGUuZmlyc3RUYWJiYWJsZU5vZGUgPSB0YWJiYWJsZU5vZGVzWzBdIHx8IGdldEluaXRpYWxGb2N1c05vZGUoKTtcclxuICAgIHN0YXRlLmxhc3RUYWJiYWJsZU5vZGUgPVxyXG4gICAgICB0YWJiYWJsZU5vZGVzW3RhYmJhYmxlTm9kZXMubGVuZ3RoIC0gMV0gfHwgZ2V0SW5pdGlhbEZvY3VzTm9kZSgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdHJ5Rm9jdXMobm9kZSkge1xyXG4gICAgaWYgKG5vZGUgPT09IGRvYy5hY3RpdmVFbGVtZW50KSByZXR1cm47XHJcbiAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZm9jdXMpIHtcclxuICAgICAgdHJ5Rm9jdXMoZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG5vZGUuZm9jdXMoKTtcclxuICAgIHN0YXRlLm1vc3RSZWNlbnRseUZvY3VzZWROb2RlID0gbm9kZTtcclxuICAgIGlmIChpc1NlbGVjdGFibGVJbnB1dChub2RlKSkge1xyXG4gICAgICBub2RlLnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNTZWxlY3RhYmxlSW5wdXQobm9kZSkge1xyXG4gIHJldHVybiAoXHJcbiAgICBub2RlLnRhZ05hbWUgJiZcclxuICAgIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnICYmXHJcbiAgICB0eXBlb2Ygbm9kZS5zZWxlY3QgPT09ICdmdW5jdGlvbidcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0VzY2FwZUV2ZW50KGUpIHtcclxuICByZXR1cm4gZS5rZXkgPT09ICdFc2NhcGUnIHx8IGUua2V5ID09PSAnRXNjJyB8fCBlLmtleUNvZGUgPT09IDI3O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1RhYkV2ZW50KGUpIHtcclxuICByZXR1cm4gZS5rZXkgPT09ICdUYWInIHx8IGUua2V5Q29kZSA9PT0gOTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsYXkoZm4pIHtcclxuICByZXR1cm4gc2V0VGltZW91dChmbiwgMCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZm9jdXNUcmFwO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBYbWxFbnRpdGllczogcmVxdWlyZSgnLi9saWIveG1sLWVudGl0aWVzLmpzJyksXHJcbiAgSHRtbDRFbnRpdGllczogcmVxdWlyZSgnLi9saWIvaHRtbDQtZW50aXRpZXMuanMnKSxcclxuICBIdG1sNUVudGl0aWVzOiByZXF1aXJlKCcuL2xpYi9odG1sNS1lbnRpdGllcy5qcycpLFxyXG4gIEFsbEh0bWxFbnRpdGllczogcmVxdWlyZSgnLi9saWIvaHRtbDUtZW50aXRpZXMuanMnKVxyXG59O1xyXG4iLCJ2YXIgSFRNTF9BTFBIQSA9IFsnYXBvcycsICduYnNwJywgJ2lleGNsJywgJ2NlbnQnLCAncG91bmQnLCAnY3VycmVuJywgJ3llbicsICdicnZiYXInLCAnc2VjdCcsICd1bWwnLCAnY29weScsICdvcmRmJywgJ2xhcXVvJywgJ25vdCcsICdzaHknLCAncmVnJywgJ21hY3InLCAnZGVnJywgJ3BsdXNtbicsICdzdXAyJywgJ3N1cDMnLCAnYWN1dGUnLCAnbWljcm8nLCAncGFyYScsICdtaWRkb3QnLCAnY2VkaWwnLCAnc3VwMScsICdvcmRtJywgJ3JhcXVvJywgJ2ZyYWMxNCcsICdmcmFjMTInLCAnZnJhYzM0JywgJ2lxdWVzdCcsICdBZ3JhdmUnLCAnQWFjdXRlJywgJ0FjaXJjJywgJ0F0aWxkZScsICdBdW1sJywgJ0FyaW5nJywgJ0FlbGlnJywgJ0NjZWRpbCcsICdFZ3JhdmUnLCAnRWFjdXRlJywgJ0VjaXJjJywgJ0V1bWwnLCAnSWdyYXZlJywgJ0lhY3V0ZScsICdJY2lyYycsICdJdW1sJywgJ0VUSCcsICdOdGlsZGUnLCAnT2dyYXZlJywgJ09hY3V0ZScsICdPY2lyYycsICdPdGlsZGUnLCAnT3VtbCcsICd0aW1lcycsICdPc2xhc2gnLCAnVWdyYXZlJywgJ1VhY3V0ZScsICdVY2lyYycsICdVdW1sJywgJ1lhY3V0ZScsICdUSE9STicsICdzemxpZycsICdhZ3JhdmUnLCAnYWFjdXRlJywgJ2FjaXJjJywgJ2F0aWxkZScsICdhdW1sJywgJ2FyaW5nJywgJ2FlbGlnJywgJ2NjZWRpbCcsICdlZ3JhdmUnLCAnZWFjdXRlJywgJ2VjaXJjJywgJ2V1bWwnLCAnaWdyYXZlJywgJ2lhY3V0ZScsICdpY2lyYycsICdpdW1sJywgJ2V0aCcsICdudGlsZGUnLCAnb2dyYXZlJywgJ29hY3V0ZScsICdvY2lyYycsICdvdGlsZGUnLCAnb3VtbCcsICdkaXZpZGUnLCAnb3NsYXNoJywgJ3VncmF2ZScsICd1YWN1dGUnLCAndWNpcmMnLCAndXVtbCcsICd5YWN1dGUnLCAndGhvcm4nLCAneXVtbCcsICdxdW90JywgJ2FtcCcsICdsdCcsICdndCcsICdPRWxpZycsICdvZWxpZycsICdTY2Fyb24nLCAnc2Nhcm9uJywgJ1l1bWwnLCAnY2lyYycsICd0aWxkZScsICdlbnNwJywgJ2Vtc3AnLCAndGhpbnNwJywgJ3p3bmonLCAnendqJywgJ2xybScsICdybG0nLCAnbmRhc2gnLCAnbWRhc2gnLCAnbHNxdW8nLCAncnNxdW8nLCAnc2JxdW8nLCAnbGRxdW8nLCAncmRxdW8nLCAnYmRxdW8nLCAnZGFnZ2VyJywgJ0RhZ2dlcicsICdwZXJtaWwnLCAnbHNhcXVvJywgJ3JzYXF1bycsICdldXJvJywgJ2Zub2YnLCAnQWxwaGEnLCAnQmV0YScsICdHYW1tYScsICdEZWx0YScsICdFcHNpbG9uJywgJ1pldGEnLCAnRXRhJywgJ1RoZXRhJywgJ0lvdGEnLCAnS2FwcGEnLCAnTGFtYmRhJywgJ011JywgJ051JywgJ1hpJywgJ09taWNyb24nLCAnUGknLCAnUmhvJywgJ1NpZ21hJywgJ1RhdScsICdVcHNpbG9uJywgJ1BoaScsICdDaGknLCAnUHNpJywgJ09tZWdhJywgJ2FscGhhJywgJ2JldGEnLCAnZ2FtbWEnLCAnZGVsdGEnLCAnZXBzaWxvbicsICd6ZXRhJywgJ2V0YScsICd0aGV0YScsICdpb3RhJywgJ2thcHBhJywgJ2xhbWJkYScsICdtdScsICdudScsICd4aScsICdvbWljcm9uJywgJ3BpJywgJ3JobycsICdzaWdtYWYnLCAnc2lnbWEnLCAndGF1JywgJ3Vwc2lsb24nLCAncGhpJywgJ2NoaScsICdwc2knLCAnb21lZ2EnLCAndGhldGFzeW0nLCAndXBzaWgnLCAncGl2JywgJ2J1bGwnLCAnaGVsbGlwJywgJ3ByaW1lJywgJ1ByaW1lJywgJ29saW5lJywgJ2ZyYXNsJywgJ3dlaWVycCcsICdpbWFnZScsICdyZWFsJywgJ3RyYWRlJywgJ2FsZWZzeW0nLCAnbGFycicsICd1YXJyJywgJ3JhcnInLCAnZGFycicsICdoYXJyJywgJ2NyYXJyJywgJ2xBcnInLCAndUFycicsICdyQXJyJywgJ2RBcnInLCAnaEFycicsICdmb3JhbGwnLCAncGFydCcsICdleGlzdCcsICdlbXB0eScsICduYWJsYScsICdpc2luJywgJ25vdGluJywgJ25pJywgJ3Byb2QnLCAnc3VtJywgJ21pbnVzJywgJ2xvd2FzdCcsICdyYWRpYycsICdwcm9wJywgJ2luZmluJywgJ2FuZycsICdhbmQnLCAnb3InLCAnY2FwJywgJ2N1cCcsICdpbnQnLCAndGhlcmU0JywgJ3NpbScsICdjb25nJywgJ2FzeW1wJywgJ25lJywgJ2VxdWl2JywgJ2xlJywgJ2dlJywgJ3N1YicsICdzdXAnLCAnbnN1YicsICdzdWJlJywgJ3N1cGUnLCAnb3BsdXMnLCAnb3RpbWVzJywgJ3BlcnAnLCAnc2RvdCcsICdsY2VpbCcsICdyY2VpbCcsICdsZmxvb3InLCAncmZsb29yJywgJ2xhbmcnLCAncmFuZycsICdsb3onLCAnc3BhZGVzJywgJ2NsdWJzJywgJ2hlYXJ0cycsICdkaWFtcyddO1xyXG52YXIgSFRNTF9DT0RFUyA9IFszOSwgMTYwLCAxNjEsIDE2MiwgMTYzLCAxNjQsIDE2NSwgMTY2LCAxNjcsIDE2OCwgMTY5LCAxNzAsIDE3MSwgMTcyLCAxNzMsIDE3NCwgMTc1LCAxNzYsIDE3NywgMTc4LCAxNzksIDE4MCwgMTgxLCAxODIsIDE4MywgMTg0LCAxODUsIDE4NiwgMTg3LCAxODgsIDE4OSwgMTkwLCAxOTEsIDE5MiwgMTkzLCAxOTQsIDE5NSwgMTk2LCAxOTcsIDE5OCwgMTk5LCAyMDAsIDIwMSwgMjAyLCAyMDMsIDIwNCwgMjA1LCAyMDYsIDIwNywgMjA4LCAyMDksIDIxMCwgMjExLCAyMTIsIDIxMywgMjE0LCAyMTUsIDIxNiwgMjE3LCAyMTgsIDIxOSwgMjIwLCAyMjEsIDIyMiwgMjIzLCAyMjQsIDIyNSwgMjI2LCAyMjcsIDIyOCwgMjI5LCAyMzAsIDIzMSwgMjMyLCAyMzMsIDIzNCwgMjM1LCAyMzYsIDIzNywgMjM4LCAyMzksIDI0MCwgMjQxLCAyNDIsIDI0MywgMjQ0LCAyNDUsIDI0NiwgMjQ3LCAyNDgsIDI0OSwgMjUwLCAyNTEsIDI1MiwgMjUzLCAyNTQsIDI1NSwgMzQsIDM4LCA2MCwgNjIsIDMzOCwgMzM5LCAzNTIsIDM1MywgMzc2LCA3MTAsIDczMiwgODE5NCwgODE5NSwgODIwMSwgODIwNCwgODIwNSwgODIwNiwgODIwNywgODIxMSwgODIxMiwgODIxNiwgODIxNywgODIxOCwgODIyMCwgODIyMSwgODIyMiwgODIyNCwgODIyNSwgODI0MCwgODI0OSwgODI1MCwgODM2NCwgNDAyLCA5MTMsIDkxNCwgOTE1LCA5MTYsIDkxNywgOTE4LCA5MTksIDkyMCwgOTIxLCA5MjIsIDkyMywgOTI0LCA5MjUsIDkyNiwgOTI3LCA5MjgsIDkyOSwgOTMxLCA5MzIsIDkzMywgOTM0LCA5MzUsIDkzNiwgOTM3LCA5NDUsIDk0NiwgOTQ3LCA5NDgsIDk0OSwgOTUwLCA5NTEsIDk1MiwgOTUzLCA5NTQsIDk1NSwgOTU2LCA5NTcsIDk1OCwgOTU5LCA5NjAsIDk2MSwgOTYyLCA5NjMsIDk2NCwgOTY1LCA5NjYsIDk2NywgOTY4LCA5NjksIDk3NywgOTc4LCA5ODIsIDgyMjYsIDgyMzAsIDgyNDIsIDgyNDMsIDgyNTQsIDgyNjAsIDg0NzIsIDg0NjUsIDg0NzYsIDg0ODIsIDg1MDEsIDg1OTIsIDg1OTMsIDg1OTQsIDg1OTUsIDg1OTYsIDg2MjksIDg2NTYsIDg2NTcsIDg2NTgsIDg2NTksIDg2NjAsIDg3MDQsIDg3MDYsIDg3MDcsIDg3MDksIDg3MTEsIDg3MTIsIDg3MTMsIDg3MTUsIDg3MTksIDg3MjEsIDg3MjIsIDg3MjcsIDg3MzAsIDg3MzMsIDg3MzQsIDg3MzYsIDg3NDMsIDg3NDQsIDg3NDUsIDg3NDYsIDg3NDcsIDg3NTYsIDg3NjQsIDg3NzMsIDg3NzYsIDg4MDAsIDg4MDEsIDg4MDQsIDg4MDUsIDg4MzQsIDg4MzUsIDg4MzYsIDg4MzgsIDg4MzksIDg4NTMsIDg4NTUsIDg4NjksIDg5MDEsIDg5NjgsIDg5NjksIDg5NzAsIDg5NzEsIDkwMDEsIDkwMDIsIDk2NzQsIDk4MjQsIDk4MjcsIDk4MjksIDk4MzBdO1xyXG5cclxudmFyIGFscGhhSW5kZXggPSB7fTtcclxudmFyIG51bUluZGV4ID0ge307XHJcblxyXG52YXIgaSA9IDA7XHJcbnZhciBsZW5ndGggPSBIVE1MX0FMUEhBLmxlbmd0aDtcclxud2hpbGUgKGkgPCBsZW5ndGgpIHtcclxuICAgIHZhciBhID0gSFRNTF9BTFBIQVtpXTtcclxuICAgIHZhciBjID0gSFRNTF9DT0RFU1tpXTtcclxuICAgIGFscGhhSW5kZXhbYV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xyXG4gICAgbnVtSW5kZXhbY10gPSBhO1xyXG4gICAgaSsrO1xyXG59XHJcblxyXG4vKipcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBIdG1sNEVudGl0aWVzKCkge31cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG5IdG1sNEVudGl0aWVzLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mKCM/W1xcd1xcZF0rKTs/L2csIGZ1bmN0aW9uKHMsIGVudGl0eSkge1xyXG4gICAgICAgIHZhciBjaHI7XHJcbiAgICAgICAgaWYgKGVudGl0eS5jaGFyQXQoMCkgPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2RlID0gZW50aXR5LmNoYXJBdCgxKS50b0xvd2VyQ2FzZSgpID09PSAneCcgP1xyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKSwgMTYpIDpcclxuICAgICAgICAgICAgICAgIHBhcnNlSW50KGVudGl0eS5zdWJzdHIoMSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpKSB7XHJcbiAgICAgICAgICAgICAgICBjaHIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hyID0gYWxwaGFJbmRleFtlbnRpdHldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hyIHx8IHM7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG5IdG1sNEVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIG5ldyBIdG1sNEVudGl0aWVzKCkuZGVjb2RlKHN0cik7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gKi9cclxuSHRtbDRFbnRpdGllcy5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICBpZiAoIXN0ciB8fCAhc3RyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcclxuICAgICAgICB2YXIgYWxwaGEgPSBudW1JbmRleFtzdHIuY2hhckNvZGVBdChpKV07XHJcbiAgICAgICAgcmVzdWx0ICs9IGFscGhhID8gXCImXCIgKyBhbHBoYSArIFwiO1wiIDogc3RyLmNoYXJBdChpKTtcclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbkh0bWw0RW50aXRpZXMuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5lbmNvZGUoc3RyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG5IdG1sNEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XHJcbiAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICB2YXIgaSA9IDA7XHJcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xyXG4gICAgICAgIHZhciBjYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIHZhciBhbHBoYSA9IG51bUluZGV4W2NjXTtcclxuICAgICAgICBpZiAoYWxwaGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjIDwgMzIgfHwgY2MgPiAxMjYpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJiNcIiArIGNjICsgXCI7XCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHN0ci5jaGFyQXQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gKi9cclxuSHRtbDRFbnRpdGllcy5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHJldHVybiBuZXcgSHRtbDRFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbkh0bWw0RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICBpZiAoIXN0ciB8fCAhc3RyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xyXG4gICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBzdHJMZW5ndGgpIHtcclxuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgIGlmIChjIDw9IDI1NSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyW2krK107XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQgKz0gJyYjJyArIGMgKyAnOyc7XHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG5IdG1sNEVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IEh0bWw0RW50aXRpZXMoKS5lbmNvZGVOb25BU0NJSShzdHIpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIdG1sNEVudGl0aWVzO1xyXG4iLCJ2YXIgRU5USVRJRVMgPSBbWydBYWN1dGUnLCBbMTkzXV0sIFsnYWFjdXRlJywgWzIyNV1dLCBbJ0FicmV2ZScsIFsyNThdXSwgWydhYnJldmUnLCBbMjU5XV0sIFsnYWMnLCBbODc2Nl1dLCBbJ2FjZCcsIFs4NzY3XV0sIFsnYWNFJywgWzg3NjYsIDgxOV1dLCBbJ0FjaXJjJywgWzE5NF1dLCBbJ2FjaXJjJywgWzIyNl1dLCBbJ2FjdXRlJywgWzE4MF1dLCBbJ0FjeScsIFsxMDQwXV0sIFsnYWN5JywgWzEwNzJdXSwgWydBRWxpZycsIFsxOThdXSwgWydhZWxpZycsIFsyMzBdXSwgWydhZicsIFs4Mjg5XV0sIFsnQWZyJywgWzEyMDA2OF1dLCBbJ2FmcicsIFsxMjAwOTRdXSwgWydBZ3JhdmUnLCBbMTkyXV0sIFsnYWdyYXZlJywgWzIyNF1dLCBbJ2FsZWZzeW0nLCBbODUwMV1dLCBbJ2FsZXBoJywgWzg1MDFdXSwgWydBbHBoYScsIFs5MTNdXSwgWydhbHBoYScsIFs5NDVdXSwgWydBbWFjcicsIFsyNTZdXSwgWydhbWFjcicsIFsyNTddXSwgWydhbWFsZycsIFsxMDgxNV1dLCBbJ2FtcCcsIFszOF1dLCBbJ0FNUCcsIFszOF1dLCBbJ2FuZGFuZCcsIFsxMDgzN11dLCBbJ0FuZCcsIFsxMDgzNV1dLCBbJ2FuZCcsIFs4NzQzXV0sIFsnYW5kZCcsIFsxMDg0NF1dLCBbJ2FuZHNsb3BlJywgWzEwODQwXV0sIFsnYW5kdicsIFsxMDg0Ml1dLCBbJ2FuZycsIFs4NzM2XV0sIFsnYW5nZScsIFsxMDY2MF1dLCBbJ2FuZ2xlJywgWzg3MzZdXSwgWydhbmdtc2RhYScsIFsxMDY2NF1dLCBbJ2FuZ21zZGFiJywgWzEwNjY1XV0sIFsnYW5nbXNkYWMnLCBbMTA2NjZdXSwgWydhbmdtc2RhZCcsIFsxMDY2N11dLCBbJ2FuZ21zZGFlJywgWzEwNjY4XV0sIFsnYW5nbXNkYWYnLCBbMTA2NjldXSwgWydhbmdtc2RhZycsIFsxMDY3MF1dLCBbJ2FuZ21zZGFoJywgWzEwNjcxXV0sIFsnYW5nbXNkJywgWzg3MzddXSwgWydhbmdydCcsIFs4NzM1XV0sIFsnYW5ncnR2YicsIFs4ODk0XV0sIFsnYW5ncnR2YmQnLCBbMTA2NTNdXSwgWydhbmdzcGgnLCBbODczOF1dLCBbJ2FuZ3N0JywgWzE5N11dLCBbJ2FuZ3phcnInLCBbOTA4NF1dLCBbJ0FvZ29uJywgWzI2MF1dLCBbJ2FvZ29uJywgWzI2MV1dLCBbJ0FvcGYnLCBbMTIwMTIwXV0sIFsnYW9wZicsIFsxMjAxNDZdXSwgWydhcGFjaXInLCBbMTA4NjNdXSwgWydhcCcsIFs4Nzc2XV0sIFsnYXBFJywgWzEwODY0XV0sIFsnYXBlJywgWzg3NzhdXSwgWydhcGlkJywgWzg3NzldXSwgWydhcG9zJywgWzM5XV0sIFsnQXBwbHlGdW5jdGlvbicsIFs4Mjg5XV0sIFsnYXBwcm94JywgWzg3NzZdXSwgWydhcHByb3hlcScsIFs4Nzc4XV0sIFsnQXJpbmcnLCBbMTk3XV0sIFsnYXJpbmcnLCBbMjI5XV0sIFsnQXNjcicsIFsxMTk5NjRdXSwgWydhc2NyJywgWzExOTk5MF1dLCBbJ0Fzc2lnbicsIFs4Nzg4XV0sIFsnYXN0JywgWzQyXV0sIFsnYXN5bXAnLCBbODc3Nl1dLCBbJ2FzeW1wZXEnLCBbODc4MV1dLCBbJ0F0aWxkZScsIFsxOTVdXSwgWydhdGlsZGUnLCBbMjI3XV0sIFsnQXVtbCcsIFsxOTZdXSwgWydhdW1sJywgWzIyOF1dLCBbJ2F3Y29uaW50JywgWzg3NTVdXSwgWydhd2ludCcsIFsxMDc2OV1dLCBbJ2JhY2tjb25nJywgWzg3ODBdXSwgWydiYWNrZXBzaWxvbicsIFsxMDE0XV0sIFsnYmFja3ByaW1lJywgWzgyNDVdXSwgWydiYWNrc2ltJywgWzg3NjVdXSwgWydiYWNrc2ltZXEnLCBbODkwOV1dLCBbJ0JhY2tzbGFzaCcsIFs4NzI2XV0sIFsnQmFydicsIFsxMDk4M11dLCBbJ2JhcnZlZScsIFs4ODkzXV0sIFsnYmFyd2VkJywgWzg5NjVdXSwgWydCYXJ3ZWQnLCBbODk2Nl1dLCBbJ2JhcndlZGdlJywgWzg5NjVdXSwgWydiYnJrJywgWzkxNDFdXSwgWydiYnJrdGJyaycsIFs5MTQyXV0sIFsnYmNvbmcnLCBbODc4MF1dLCBbJ0JjeScsIFsxMDQxXV0sIFsnYmN5JywgWzEwNzNdXSwgWydiZHF1bycsIFs4MjIyXV0sIFsnYmVjYXVzJywgWzg3NTddXSwgWydiZWNhdXNlJywgWzg3NTddXSwgWydCZWNhdXNlJywgWzg3NTddXSwgWydiZW1wdHl2JywgWzEwNjcyXV0sIFsnYmVwc2knLCBbMTAxNF1dLCBbJ2Jlcm5vdScsIFs4NDkyXV0sIFsnQmVybm91bGxpcycsIFs4NDkyXV0sIFsnQmV0YScsIFs5MTRdXSwgWydiZXRhJywgWzk0Nl1dLCBbJ2JldGgnLCBbODUwMl1dLCBbJ2JldHdlZW4nLCBbODgxMl1dLCBbJ0JmcicsIFsxMjAwNjldXSwgWydiZnInLCBbMTIwMDk1XV0sIFsnYmlnY2FwJywgWzg4OThdXSwgWydiaWdjaXJjJywgWzk3MTFdXSwgWydiaWdjdXAnLCBbODg5OV1dLCBbJ2JpZ29kb3QnLCBbMTA3NTJdXSwgWydiaWdvcGx1cycsIFsxMDc1M11dLCBbJ2JpZ290aW1lcycsIFsxMDc1NF1dLCBbJ2JpZ3NxY3VwJywgWzEwNzU4XV0sIFsnYmlnc3RhcicsIFs5NzMzXV0sIFsnYmlndHJpYW5nbGVkb3duJywgWzk2NjFdXSwgWydiaWd0cmlhbmdsZXVwJywgWzk2NTFdXSwgWydiaWd1cGx1cycsIFsxMDc1Nl1dLCBbJ2JpZ3ZlZScsIFs4ODk3XV0sIFsnYmlnd2VkZ2UnLCBbODg5Nl1dLCBbJ2JrYXJvdycsIFsxMDUwOV1dLCBbJ2JsYWNrbG96ZW5nZScsIFsxMDczMV1dLCBbJ2JsYWNrc3F1YXJlJywgWzk2NDJdXSwgWydibGFja3RyaWFuZ2xlJywgWzk2NTJdXSwgWydibGFja3RyaWFuZ2xlZG93bicsIFs5NjYyXV0sIFsnYmxhY2t0cmlhbmdsZWxlZnQnLCBbOTY2Nl1dLCBbJ2JsYWNrdHJpYW5nbGVyaWdodCcsIFs5NjU2XV0sIFsnYmxhbmsnLCBbOTI1MV1dLCBbJ2JsazEyJywgWzk2MThdXSwgWydibGsxNCcsIFs5NjE3XV0sIFsnYmxrMzQnLCBbOTYxOV1dLCBbJ2Jsb2NrJywgWzk2MDhdXSwgWydibmUnLCBbNjEsIDg0MjFdXSwgWydibmVxdWl2JywgWzg4MDEsIDg0MjFdXSwgWydiTm90JywgWzEwOTg5XV0sIFsnYm5vdCcsIFs4OTc2XV0sIFsnQm9wZicsIFsxMjAxMjFdXSwgWydib3BmJywgWzEyMDE0N11dLCBbJ2JvdCcsIFs4ODY5XV0sIFsnYm90dG9tJywgWzg4NjldXSwgWydib3d0aWUnLCBbODkwNF1dLCBbJ2JveGJveCcsIFsxMDY5N11dLCBbJ2JveGRsJywgWzk0ODhdXSwgWydib3hkTCcsIFs5NTU3XV0sIFsnYm94RGwnLCBbOTU1OF1dLCBbJ2JveERMJywgWzk1NTldXSwgWydib3hkcicsIFs5NDg0XV0sIFsnYm94ZFInLCBbOTU1NF1dLCBbJ2JveERyJywgWzk1NTVdXSwgWydib3hEUicsIFs5NTU2XV0sIFsnYm94aCcsIFs5NDcyXV0sIFsnYm94SCcsIFs5NTUyXV0sIFsnYm94aGQnLCBbOTUxNl1dLCBbJ2JveEhkJywgWzk1NzJdXSwgWydib3hoRCcsIFs5NTczXV0sIFsnYm94SEQnLCBbOTU3NF1dLCBbJ2JveGh1JywgWzk1MjRdXSwgWydib3hIdScsIFs5NTc1XV0sIFsnYm94aFUnLCBbOTU3Nl1dLCBbJ2JveEhVJywgWzk1NzddXSwgWydib3htaW51cycsIFs4ODYzXV0sIFsnYm94cGx1cycsIFs4ODYyXV0sIFsnYm94dGltZXMnLCBbODg2NF1dLCBbJ2JveHVsJywgWzk0OTZdXSwgWydib3h1TCcsIFs5NTYzXV0sIFsnYm94VWwnLCBbOTU2NF1dLCBbJ2JveFVMJywgWzk1NjVdXSwgWydib3h1cicsIFs5NDkyXV0sIFsnYm94dVInLCBbOTU2MF1dLCBbJ2JveFVyJywgWzk1NjFdXSwgWydib3hVUicsIFs5NTYyXV0sIFsnYm94dicsIFs5NDc0XV0sIFsnYm94VicsIFs5NTUzXV0sIFsnYm94dmgnLCBbOTUzMl1dLCBbJ2JveHZIJywgWzk1NzhdXSwgWydib3hWaCcsIFs5NTc5XV0sIFsnYm94VkgnLCBbOTU4MF1dLCBbJ2JveHZsJywgWzk1MDhdXSwgWydib3h2TCcsIFs5NTY5XV0sIFsnYm94VmwnLCBbOTU3MF1dLCBbJ2JveFZMJywgWzk1NzFdXSwgWydib3h2cicsIFs5NTAwXV0sIFsnYm94dlInLCBbOTU2Nl1dLCBbJ2JveFZyJywgWzk1NjddXSwgWydib3hWUicsIFs5NTY4XV0sIFsnYnByaW1lJywgWzgyNDVdXSwgWydicmV2ZScsIFs3MjhdXSwgWydCcmV2ZScsIFs3MjhdXSwgWydicnZiYXInLCBbMTY2XV0sIFsnYnNjcicsIFsxMTk5OTFdXSwgWydCc2NyJywgWzg0OTJdXSwgWydic2VtaScsIFs4MjcxXV0sIFsnYnNpbScsIFs4NzY1XV0sIFsnYnNpbWUnLCBbODkwOV1dLCBbJ2Jzb2xiJywgWzEwNjkzXV0sIFsnYnNvbCcsIFs5Ml1dLCBbJ2Jzb2xoc3ViJywgWzEwMTg0XV0sIFsnYnVsbCcsIFs4MjI2XV0sIFsnYnVsbGV0JywgWzgyMjZdXSwgWydidW1wJywgWzg3ODJdXSwgWydidW1wRScsIFsxMDkyNl1dLCBbJ2J1bXBlJywgWzg3ODNdXSwgWydCdW1wZXEnLCBbODc4Ml1dLCBbJ2J1bXBlcScsIFs4NzgzXV0sIFsnQ2FjdXRlJywgWzI2Ml1dLCBbJ2NhY3V0ZScsIFsyNjNdXSwgWydjYXBhbmQnLCBbMTA4MjBdXSwgWydjYXBicmN1cCcsIFsxMDgyNV1dLCBbJ2NhcGNhcCcsIFsxMDgyN11dLCBbJ2NhcCcsIFs4NzQ1XV0sIFsnQ2FwJywgWzg5MTRdXSwgWydjYXBjdXAnLCBbMTA4MjNdXSwgWydjYXBkb3QnLCBbMTA4MTZdXSwgWydDYXBpdGFsRGlmZmVyZW50aWFsRCcsIFs4NTE3XV0sIFsnY2FwcycsIFs4NzQ1LCA2NTAyNF1dLCBbJ2NhcmV0JywgWzgyNTddXSwgWydjYXJvbicsIFs3MTFdXSwgWydDYXlsZXlzJywgWzg0OTNdXSwgWydjY2FwcycsIFsxMDgyOV1dLCBbJ0NjYXJvbicsIFsyNjhdXSwgWydjY2Fyb24nLCBbMjY5XV0sIFsnQ2NlZGlsJywgWzE5OV1dLCBbJ2NjZWRpbCcsIFsyMzFdXSwgWydDY2lyYycsIFsyNjRdXSwgWydjY2lyYycsIFsyNjVdXSwgWydDY29uaW50JywgWzg3NTJdXSwgWydjY3VwcycsIFsxMDgyOF1dLCBbJ2NjdXBzc20nLCBbMTA4MzJdXSwgWydDZG90JywgWzI2Nl1dLCBbJ2Nkb3QnLCBbMjY3XV0sIFsnY2VkaWwnLCBbMTg0XV0sIFsnQ2VkaWxsYScsIFsxODRdXSwgWydjZW1wdHl2JywgWzEwNjc0XV0sIFsnY2VudCcsIFsxNjJdXSwgWydjZW50ZXJkb3QnLCBbMTgzXV0sIFsnQ2VudGVyRG90JywgWzE4M11dLCBbJ2NmcicsIFsxMjAwOTZdXSwgWydDZnInLCBbODQ5M11dLCBbJ0NIY3knLCBbMTA2M11dLCBbJ2NoY3knLCBbMTA5NV1dLCBbJ2NoZWNrJywgWzEwMDAzXV0sIFsnY2hlY2ttYXJrJywgWzEwMDAzXV0sIFsnQ2hpJywgWzkzNV1dLCBbJ2NoaScsIFs5NjddXSwgWydjaXJjJywgWzcxMF1dLCBbJ2NpcmNlcScsIFs4NzkxXV0sIFsnY2lyY2xlYXJyb3dsZWZ0JywgWzg2MzRdXSwgWydjaXJjbGVhcnJvd3JpZ2h0JywgWzg2MzVdXSwgWydjaXJjbGVkYXN0JywgWzg4NTldXSwgWydjaXJjbGVkY2lyYycsIFs4ODU4XV0sIFsnY2lyY2xlZGRhc2gnLCBbODg2MV1dLCBbJ0NpcmNsZURvdCcsIFs4ODU3XV0sIFsnY2lyY2xlZFInLCBbMTc0XV0sIFsnY2lyY2xlZFMnLCBbOTQxNl1dLCBbJ0NpcmNsZU1pbnVzJywgWzg4NTRdXSwgWydDaXJjbGVQbHVzJywgWzg4NTNdXSwgWydDaXJjbGVUaW1lcycsIFs4ODU1XV0sIFsnY2lyJywgWzk2NzVdXSwgWydjaXJFJywgWzEwNjkxXV0sIFsnY2lyZScsIFs4NzkxXV0sIFsnY2lyZm5pbnQnLCBbMTA3NjhdXSwgWydjaXJtaWQnLCBbMTA5OTFdXSwgWydjaXJzY2lyJywgWzEwNjkwXV0sIFsnQ2xvY2t3aXNlQ29udG91ckludGVncmFsJywgWzg3NTRdXSwgWydjbHVicycsIFs5ODI3XV0sIFsnY2x1YnN1aXQnLCBbOTgyN11dLCBbJ2NvbG9uJywgWzU4XV0sIFsnQ29sb24nLCBbODc1OV1dLCBbJ0NvbG9uZScsIFsxMDg2OF1dLCBbJ2NvbG9uZScsIFs4Nzg4XV0sIFsnY29sb25lcScsIFs4Nzg4XV0sIFsnY29tbWEnLCBbNDRdXSwgWydjb21tYXQnLCBbNjRdXSwgWydjb21wJywgWzg3MDVdXSwgWydjb21wZm4nLCBbODcyOF1dLCBbJ2NvbXBsZW1lbnQnLCBbODcwNV1dLCBbJ2NvbXBsZXhlcycsIFs4NDUwXV0sIFsnY29uZycsIFs4NzczXV0sIFsnY29uZ2RvdCcsIFsxMDg2MV1dLCBbJ0NvbmdydWVudCcsIFs4ODAxXV0sIFsnY29uaW50JywgWzg3NTBdXSwgWydDb25pbnQnLCBbODc1MV1dLCBbJ0NvbnRvdXJJbnRlZ3JhbCcsIFs4NzUwXV0sIFsnY29wZicsIFsxMjAxNDhdXSwgWydDb3BmJywgWzg0NTBdXSwgWydjb3Byb2QnLCBbODcyMF1dLCBbJ0NvcHJvZHVjdCcsIFs4NzIwXV0sIFsnY29weScsIFsxNjldXSwgWydDT1BZJywgWzE2OV1dLCBbJ2NvcHlzcicsIFs4NDcxXV0sIFsnQ291bnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbCcsIFs4NzU1XV0sIFsnY3JhcnInLCBbODYyOV1dLCBbJ2Nyb3NzJywgWzEwMDA3XV0sIFsnQ3Jvc3MnLCBbMTA3OTldXSwgWydDc2NyJywgWzExOTk2Nl1dLCBbJ2NzY3InLCBbMTE5OTkyXV0sIFsnY3N1YicsIFsxMDk1OV1dLCBbJ2NzdWJlJywgWzEwOTYxXV0sIFsnY3N1cCcsIFsxMDk2MF1dLCBbJ2NzdXBlJywgWzEwOTYyXV0sIFsnY3Rkb3QnLCBbODk0M11dLCBbJ2N1ZGFycmwnLCBbMTA1NTJdXSwgWydjdWRhcnJyJywgWzEwNTQ5XV0sIFsnY3VlcHInLCBbODkyNl1dLCBbJ2N1ZXNjJywgWzg5MjddXSwgWydjdWxhcnInLCBbODYzMF1dLCBbJ2N1bGFycnAnLCBbMTA1NTddXSwgWydjdXBicmNhcCcsIFsxMDgyNF1dLCBbJ2N1cGNhcCcsIFsxMDgyMl1dLCBbJ0N1cENhcCcsIFs4NzgxXV0sIFsnY3VwJywgWzg3NDZdXSwgWydDdXAnLCBbODkxNV1dLCBbJ2N1cGN1cCcsIFsxMDgyNl1dLCBbJ2N1cGRvdCcsIFs4ODQ1XV0sIFsnY3Vwb3InLCBbMTA4MjFdXSwgWydjdXBzJywgWzg3NDYsIDY1MDI0XV0sIFsnY3VyYXJyJywgWzg2MzFdXSwgWydjdXJhcnJtJywgWzEwNTU2XV0sIFsnY3VybHllcXByZWMnLCBbODkyNl1dLCBbJ2N1cmx5ZXFzdWNjJywgWzg5MjddXSwgWydjdXJseXZlZScsIFs4OTEwXV0sIFsnY3VybHl3ZWRnZScsIFs4OTExXV0sIFsnY3VycmVuJywgWzE2NF1dLCBbJ2N1cnZlYXJyb3dsZWZ0JywgWzg2MzBdXSwgWydjdXJ2ZWFycm93cmlnaHQnLCBbODYzMV1dLCBbJ2N1dmVlJywgWzg5MTBdXSwgWydjdXdlZCcsIFs4OTExXV0sIFsnY3djb25pbnQnLCBbODc1NF1dLCBbJ2N3aW50JywgWzg3NTNdXSwgWydjeWxjdHknLCBbOTAwNV1dLCBbJ2RhZ2dlcicsIFs4MjI0XV0sIFsnRGFnZ2VyJywgWzgyMjVdXSwgWydkYWxldGgnLCBbODUwNF1dLCBbJ2RhcnInLCBbODU5NV1dLCBbJ0RhcnInLCBbODYwOV1dLCBbJ2RBcnInLCBbODY1OV1dLCBbJ2Rhc2gnLCBbODIwOF1dLCBbJ0Rhc2h2JywgWzEwOTgwXV0sIFsnZGFzaHYnLCBbODg2N11dLCBbJ2Ria2Fyb3cnLCBbMTA1MTFdXSwgWydkYmxhYycsIFs3MzNdXSwgWydEY2Fyb24nLCBbMjcwXV0sIFsnZGNhcm9uJywgWzI3MV1dLCBbJ0RjeScsIFsxMDQ0XV0sIFsnZGN5JywgWzEwNzZdXSwgWydkZGFnZ2VyJywgWzgyMjVdXSwgWydkZGFycicsIFs4NjUwXV0sIFsnREQnLCBbODUxN11dLCBbJ2RkJywgWzg1MThdXSwgWydERG90cmFoZCcsIFsxMDUxM11dLCBbJ2Rkb3RzZXEnLCBbMTA4NzFdXSwgWydkZWcnLCBbMTc2XV0sIFsnRGVsJywgWzg3MTFdXSwgWydEZWx0YScsIFs5MTZdXSwgWydkZWx0YScsIFs5NDhdXSwgWydkZW1wdHl2JywgWzEwNjczXV0sIFsnZGZpc2h0JywgWzEwNjIzXV0sIFsnRGZyJywgWzEyMDA3MV1dLCBbJ2RmcicsIFsxMjAwOTddXSwgWydkSGFyJywgWzEwNTk3XV0sIFsnZGhhcmwnLCBbODY0M11dLCBbJ2RoYXJyJywgWzg2NDJdXSwgWydEaWFjcml0aWNhbEFjdXRlJywgWzE4MF1dLCBbJ0RpYWNyaXRpY2FsRG90JywgWzcyOV1dLCBbJ0RpYWNyaXRpY2FsRG91YmxlQWN1dGUnLCBbNzMzXV0sIFsnRGlhY3JpdGljYWxHcmF2ZScsIFs5Nl1dLCBbJ0RpYWNyaXRpY2FsVGlsZGUnLCBbNzMyXV0sIFsnZGlhbScsIFs4OTAwXV0sIFsnZGlhbW9uZCcsIFs4OTAwXV0sIFsnRGlhbW9uZCcsIFs4OTAwXV0sIFsnZGlhbW9uZHN1aXQnLCBbOTgzMF1dLCBbJ2RpYW1zJywgWzk4MzBdXSwgWydkaWUnLCBbMTY4XV0sIFsnRGlmZmVyZW50aWFsRCcsIFs4NTE4XV0sIFsnZGlnYW1tYScsIFs5ODldXSwgWydkaXNpbicsIFs4OTQ2XV0sIFsnZGl2JywgWzI0N11dLCBbJ2RpdmlkZScsIFsyNDddXSwgWydkaXZpZGVvbnRpbWVzJywgWzg5MDNdXSwgWydkaXZvbngnLCBbODkwM11dLCBbJ0RKY3knLCBbMTAyNl1dLCBbJ2RqY3knLCBbMTEwNl1dLCBbJ2RsY29ybicsIFs4OTkwXV0sIFsnZGxjcm9wJywgWzg5NzNdXSwgWydkb2xsYXInLCBbMzZdXSwgWydEb3BmJywgWzEyMDEyM11dLCBbJ2RvcGYnLCBbMTIwMTQ5XV0sIFsnRG90JywgWzE2OF1dLCBbJ2RvdCcsIFs3MjldXSwgWydEb3REb3QnLCBbODQxMl1dLCBbJ2RvdGVxJywgWzg3ODRdXSwgWydkb3RlcWRvdCcsIFs4Nzg1XV0sIFsnRG90RXF1YWwnLCBbODc4NF1dLCBbJ2RvdG1pbnVzJywgWzg3NjBdXSwgWydkb3RwbHVzJywgWzg3MjRdXSwgWydkb3RzcXVhcmUnLCBbODg2NV1dLCBbJ2RvdWJsZWJhcndlZGdlJywgWzg5NjZdXSwgWydEb3VibGVDb250b3VySW50ZWdyYWwnLCBbODc1MV1dLCBbJ0RvdWJsZURvdCcsIFsxNjhdXSwgWydEb3VibGVEb3duQXJyb3cnLCBbODY1OV1dLCBbJ0RvdWJsZUxlZnRBcnJvdycsIFs4NjU2XV0sIFsnRG91YmxlTGVmdFJpZ2h0QXJyb3cnLCBbODY2MF1dLCBbJ0RvdWJsZUxlZnRUZWUnLCBbMTA5ODBdXSwgWydEb3VibGVMb25nTGVmdEFycm93JywgWzEwMjMyXV0sIFsnRG91YmxlTG9uZ0xlZnRSaWdodEFycm93JywgWzEwMjM0XV0sIFsnRG91YmxlTG9uZ1JpZ2h0QXJyb3cnLCBbMTAyMzNdXSwgWydEb3VibGVSaWdodEFycm93JywgWzg2NThdXSwgWydEb3VibGVSaWdodFRlZScsIFs4ODcyXV0sIFsnRG91YmxlVXBBcnJvdycsIFs4NjU3XV0sIFsnRG91YmxlVXBEb3duQXJyb3cnLCBbODY2MV1dLCBbJ0RvdWJsZVZlcnRpY2FsQmFyJywgWzg3NDFdXSwgWydEb3duQXJyb3dCYXInLCBbMTA1MTVdXSwgWydkb3duYXJyb3cnLCBbODU5NV1dLCBbJ0Rvd25BcnJvdycsIFs4NTk1XV0sIFsnRG93bmFycm93JywgWzg2NTldXSwgWydEb3duQXJyb3dVcEFycm93JywgWzg2OTNdXSwgWydEb3duQnJldmUnLCBbNzg1XV0sIFsnZG93bmRvd25hcnJvd3MnLCBbODY1MF1dLCBbJ2Rvd25oYXJwb29ubGVmdCcsIFs4NjQzXV0sIFsnZG93bmhhcnBvb25yaWdodCcsIFs4NjQyXV0sIFsnRG93bkxlZnRSaWdodFZlY3RvcicsIFsxMDU3Nl1dLCBbJ0Rvd25MZWZ0VGVlVmVjdG9yJywgWzEwNTkwXV0sIFsnRG93bkxlZnRWZWN0b3JCYXInLCBbMTA1ODJdXSwgWydEb3duTGVmdFZlY3RvcicsIFs4NjM3XV0sIFsnRG93blJpZ2h0VGVlVmVjdG9yJywgWzEwNTkxXV0sIFsnRG93blJpZ2h0VmVjdG9yQmFyJywgWzEwNTgzXV0sIFsnRG93blJpZ2h0VmVjdG9yJywgWzg2NDFdXSwgWydEb3duVGVlQXJyb3cnLCBbODYxNV1dLCBbJ0Rvd25UZWUnLCBbODg2OF1dLCBbJ2RyYmthcm93JywgWzEwNTEyXV0sIFsnZHJjb3JuJywgWzg5OTFdXSwgWydkcmNyb3AnLCBbODk3Ml1dLCBbJ0RzY3InLCBbMTE5OTY3XV0sIFsnZHNjcicsIFsxMTk5OTNdXSwgWydEU2N5JywgWzEwMjldXSwgWydkc2N5JywgWzExMDldXSwgWydkc29sJywgWzEwNzQyXV0sIFsnRHN0cm9rJywgWzI3Ml1dLCBbJ2RzdHJvaycsIFsyNzNdXSwgWydkdGRvdCcsIFs4OTQ1XV0sIFsnZHRyaScsIFs5NjYzXV0sIFsnZHRyaWYnLCBbOTY2Ml1dLCBbJ2R1YXJyJywgWzg2OTNdXSwgWydkdWhhcicsIFsxMDYwN11dLCBbJ2R3YW5nbGUnLCBbMTA2NjJdXSwgWydEWmN5JywgWzEwMzldXSwgWydkemN5JywgWzExMTldXSwgWydkemlncmFycicsIFsxMDIzOV1dLCBbJ0VhY3V0ZScsIFsyMDFdXSwgWydlYWN1dGUnLCBbMjMzXV0sIFsnZWFzdGVyJywgWzEwODYyXV0sIFsnRWNhcm9uJywgWzI4Ml1dLCBbJ2VjYXJvbicsIFsyODNdXSwgWydFY2lyYycsIFsyMDJdXSwgWydlY2lyYycsIFsyMzRdXSwgWydlY2lyJywgWzg3OTBdXSwgWydlY29sb24nLCBbODc4OV1dLCBbJ0VjeScsIFsxMDY5XV0sIFsnZWN5JywgWzExMDFdXSwgWydlRERvdCcsIFsxMDg3MV1dLCBbJ0Vkb3QnLCBbMjc4XV0sIFsnZWRvdCcsIFsyNzldXSwgWydlRG90JywgWzg3ODVdXSwgWydlZScsIFs4NTE5XV0sIFsnZWZEb3QnLCBbODc4Nl1dLCBbJ0VmcicsIFsxMjAwNzJdXSwgWydlZnInLCBbMTIwMDk4XV0sIFsnZWcnLCBbMTA5MDZdXSwgWydFZ3JhdmUnLCBbMjAwXV0sIFsnZWdyYXZlJywgWzIzMl1dLCBbJ2VncycsIFsxMDkwMl1dLCBbJ2Vnc2RvdCcsIFsxMDkwNF1dLCBbJ2VsJywgWzEwOTA1XV0sIFsnRWxlbWVudCcsIFs4NzEyXV0sIFsnZWxpbnRlcnMnLCBbOTE5MV1dLCBbJ2VsbCcsIFs4NDY3XV0sIFsnZWxzJywgWzEwOTAxXV0sIFsnZWxzZG90JywgWzEwOTAzXV0sIFsnRW1hY3InLCBbMjc0XV0sIFsnZW1hY3InLCBbMjc1XV0sIFsnZW1wdHknLCBbODcwOV1dLCBbJ2VtcHR5c2V0JywgWzg3MDldXSwgWydFbXB0eVNtYWxsU3F1YXJlJywgWzk3MjNdXSwgWydlbXB0eXYnLCBbODcwOV1dLCBbJ0VtcHR5VmVyeVNtYWxsU3F1YXJlJywgWzk2NDNdXSwgWydlbXNwMTMnLCBbODE5Nl1dLCBbJ2Vtc3AxNCcsIFs4MTk3XV0sIFsnZW1zcCcsIFs4MTk1XV0sIFsnRU5HJywgWzMzMF1dLCBbJ2VuZycsIFszMzFdXSwgWydlbnNwJywgWzgxOTRdXSwgWydFb2dvbicsIFsyODBdXSwgWydlb2dvbicsIFsyODFdXSwgWydFb3BmJywgWzEyMDEyNF1dLCBbJ2VvcGYnLCBbMTIwMTUwXV0sIFsnZXBhcicsIFs4OTE3XV0sIFsnZXBhcnNsJywgWzEwNzIzXV0sIFsnZXBsdXMnLCBbMTA4NjVdXSwgWydlcHNpJywgWzk0OV1dLCBbJ0Vwc2lsb24nLCBbOTE3XV0sIFsnZXBzaWxvbicsIFs5NDldXSwgWydlcHNpdicsIFsxMDEzXV0sIFsnZXFjaXJjJywgWzg3OTBdXSwgWydlcWNvbG9uJywgWzg3ODldXSwgWydlcXNpbScsIFs4NzcwXV0sIFsnZXFzbGFudGd0cicsIFsxMDkwMl1dLCBbJ2Vxc2xhbnRsZXNzJywgWzEwOTAxXV0sIFsnRXF1YWwnLCBbMTA4NjldXSwgWydlcXVhbHMnLCBbNjFdXSwgWydFcXVhbFRpbGRlJywgWzg3NzBdXSwgWydlcXVlc3QnLCBbODc5OV1dLCBbJ0VxdWlsaWJyaXVtJywgWzg2NTJdXSwgWydlcXVpdicsIFs4ODAxXV0sIFsnZXF1aXZERCcsIFsxMDg3Ml1dLCBbJ2VxdnBhcnNsJywgWzEwNzI1XV0sIFsnZXJhcnInLCBbMTA2MDldXSwgWydlckRvdCcsIFs4Nzg3XV0sIFsnZXNjcicsIFs4NDk1XV0sIFsnRXNjcicsIFs4NDk2XV0sIFsnZXNkb3QnLCBbODc4NF1dLCBbJ0VzaW0nLCBbMTA4NjddXSwgWydlc2ltJywgWzg3NzBdXSwgWydFdGEnLCBbOTE5XV0sIFsnZXRhJywgWzk1MV1dLCBbJ0VUSCcsIFsyMDhdXSwgWydldGgnLCBbMjQwXV0sIFsnRXVtbCcsIFsyMDNdXSwgWydldW1sJywgWzIzNV1dLCBbJ2V1cm8nLCBbODM2NF1dLCBbJ2V4Y2wnLCBbMzNdXSwgWydleGlzdCcsIFs4NzA3XV0sIFsnRXhpc3RzJywgWzg3MDddXSwgWydleHBlY3RhdGlvbicsIFs4NDk2XV0sIFsnZXhwb25lbnRpYWxlJywgWzg1MTldXSwgWydFeHBvbmVudGlhbEUnLCBbODUxOV1dLCBbJ2ZhbGxpbmdkb3RzZXEnLCBbODc4Nl1dLCBbJ0ZjeScsIFsxMDYwXV0sIFsnZmN5JywgWzEwOTJdXSwgWydmZW1hbGUnLCBbOTc5Ml1dLCBbJ2ZmaWxpZycsIFs2NDI1OV1dLCBbJ2ZmbGlnJywgWzY0MjU2XV0sIFsnZmZsbGlnJywgWzY0MjYwXV0sIFsnRmZyJywgWzEyMDA3M11dLCBbJ2ZmcicsIFsxMjAwOTldXSwgWydmaWxpZycsIFs2NDI1N11dLCBbJ0ZpbGxlZFNtYWxsU3F1YXJlJywgWzk3MjRdXSwgWydGaWxsZWRWZXJ5U21hbGxTcXVhcmUnLCBbOTY0Ml1dLCBbJ2ZqbGlnJywgWzEwMiwgMTA2XV0sIFsnZmxhdCcsIFs5ODM3XV0sIFsnZmxsaWcnLCBbNjQyNThdXSwgWydmbHRucycsIFs5NjQ5XV0sIFsnZm5vZicsIFs0MDJdXSwgWydGb3BmJywgWzEyMDEyNV1dLCBbJ2ZvcGYnLCBbMTIwMTUxXV0sIFsnZm9yYWxsJywgWzg3MDRdXSwgWydGb3JBbGwnLCBbODcwNF1dLCBbJ2ZvcmsnLCBbODkxNl1dLCBbJ2Zvcmt2JywgWzEwOTY5XV0sIFsnRm91cmllcnRyZicsIFs4NDk3XV0sIFsnZnBhcnRpbnQnLCBbMTA3NjVdXSwgWydmcmFjMTInLCBbMTg5XV0sIFsnZnJhYzEzJywgWzg1MzFdXSwgWydmcmFjMTQnLCBbMTg4XV0sIFsnZnJhYzE1JywgWzg1MzNdXSwgWydmcmFjMTYnLCBbODUzN11dLCBbJ2ZyYWMxOCcsIFs4NTM5XV0sIFsnZnJhYzIzJywgWzg1MzJdXSwgWydmcmFjMjUnLCBbODUzNF1dLCBbJ2ZyYWMzNCcsIFsxOTBdXSwgWydmcmFjMzUnLCBbODUzNV1dLCBbJ2ZyYWMzOCcsIFs4NTQwXV0sIFsnZnJhYzQ1JywgWzg1MzZdXSwgWydmcmFjNTYnLCBbODUzOF1dLCBbJ2ZyYWM1OCcsIFs4NTQxXV0sIFsnZnJhYzc4JywgWzg1NDJdXSwgWydmcmFzbCcsIFs4MjYwXV0sIFsnZnJvd24nLCBbODk5NF1dLCBbJ2ZzY3InLCBbMTE5OTk1XV0sIFsnRnNjcicsIFs4NDk3XV0sIFsnZ2FjdXRlJywgWzUwMV1dLCBbJ0dhbW1hJywgWzkxNV1dLCBbJ2dhbW1hJywgWzk0N11dLCBbJ0dhbW1hZCcsIFs5ODhdXSwgWydnYW1tYWQnLCBbOTg5XV0sIFsnZ2FwJywgWzEwODg2XV0sIFsnR2JyZXZlJywgWzI4Nl1dLCBbJ2dicmV2ZScsIFsyODddXSwgWydHY2VkaWwnLCBbMjkwXV0sIFsnR2NpcmMnLCBbMjg0XV0sIFsnZ2NpcmMnLCBbMjg1XV0sIFsnR2N5JywgWzEwNDNdXSwgWydnY3knLCBbMTA3NV1dLCBbJ0dkb3QnLCBbMjg4XV0sIFsnZ2RvdCcsIFsyODldXSwgWydnZScsIFs4ODA1XV0sIFsnZ0UnLCBbODgwN11dLCBbJ2dFbCcsIFsxMDg5Ml1dLCBbJ2dlbCcsIFs4OTIzXV0sIFsnZ2VxJywgWzg4MDVdXSwgWydnZXFxJywgWzg4MDddXSwgWydnZXFzbGFudCcsIFsxMDg3OF1dLCBbJ2dlc2NjJywgWzEwOTIxXV0sIFsnZ2VzJywgWzEwODc4XV0sIFsnZ2VzZG90JywgWzEwODgwXV0sIFsnZ2VzZG90bycsIFsxMDg4Ml1dLCBbJ2dlc2RvdG9sJywgWzEwODg0XV0sIFsnZ2VzbCcsIFs4OTIzLCA2NTAyNF1dLCBbJ2dlc2xlcycsIFsxMDkwMF1dLCBbJ0dmcicsIFsxMjAwNzRdXSwgWydnZnInLCBbMTIwMTAwXV0sIFsnZ2cnLCBbODgxMV1dLCBbJ0dnJywgWzg5MjFdXSwgWydnZ2cnLCBbODkyMV1dLCBbJ2dpbWVsJywgWzg1MDNdXSwgWydHSmN5JywgWzEwMjddXSwgWydnamN5JywgWzExMDddXSwgWydnbGEnLCBbMTA5MTddXSwgWydnbCcsIFs4ODIzXV0sIFsnZ2xFJywgWzEwODk4XV0sIFsnZ2xqJywgWzEwOTE2XV0sIFsnZ25hcCcsIFsxMDg5MF1dLCBbJ2duYXBwcm94JywgWzEwODkwXV0sIFsnZ25lJywgWzEwODg4XV0sIFsnZ25FJywgWzg4MDldXSwgWydnbmVxJywgWzEwODg4XV0sIFsnZ25lcXEnLCBbODgwOV1dLCBbJ2duc2ltJywgWzg5MzVdXSwgWydHb3BmJywgWzEyMDEyNl1dLCBbJ2dvcGYnLCBbMTIwMTUyXV0sIFsnZ3JhdmUnLCBbOTZdXSwgWydHcmVhdGVyRXF1YWwnLCBbODgwNV1dLCBbJ0dyZWF0ZXJFcXVhbExlc3MnLCBbODkyM11dLCBbJ0dyZWF0ZXJGdWxsRXF1YWwnLCBbODgwN11dLCBbJ0dyZWF0ZXJHcmVhdGVyJywgWzEwOTE0XV0sIFsnR3JlYXRlckxlc3MnLCBbODgyM11dLCBbJ0dyZWF0ZXJTbGFudEVxdWFsJywgWzEwODc4XV0sIFsnR3JlYXRlclRpbGRlJywgWzg4MTldXSwgWydHc2NyJywgWzExOTk3MF1dLCBbJ2dzY3InLCBbODQ1OF1dLCBbJ2dzaW0nLCBbODgxOV1dLCBbJ2dzaW1lJywgWzEwODk0XV0sIFsnZ3NpbWwnLCBbMTA4OTZdXSwgWydndGNjJywgWzEwOTE5XV0sIFsnZ3RjaXInLCBbMTA4NzRdXSwgWydndCcsIFs2Ml1dLCBbJ0dUJywgWzYyXV0sIFsnR3QnLCBbODgxMV1dLCBbJ2d0ZG90JywgWzg5MTldXSwgWydndGxQYXInLCBbMTA2NDVdXSwgWydndHF1ZXN0JywgWzEwODc2XV0sIFsnZ3RyYXBwcm94JywgWzEwODg2XV0sIFsnZ3RyYXJyJywgWzEwNjE2XV0sIFsnZ3RyZG90JywgWzg5MTldXSwgWydndHJlcWxlc3MnLCBbODkyM11dLCBbJ2d0cmVxcWxlc3MnLCBbMTA4OTJdXSwgWydndHJsZXNzJywgWzg4MjNdXSwgWydndHJzaW0nLCBbODgxOV1dLCBbJ2d2ZXJ0bmVxcScsIFs4ODA5LCA2NTAyNF1dLCBbJ2d2bkUnLCBbODgwOSwgNjUwMjRdXSwgWydIYWNlaycsIFs3MTFdXSwgWydoYWlyc3AnLCBbODIwMl1dLCBbJ2hhbGYnLCBbMTg5XV0sIFsnaGFtaWx0JywgWzg0NTldXSwgWydIQVJEY3knLCBbMTA2Nl1dLCBbJ2hhcmRjeScsIFsxMDk4XV0sIFsnaGFycmNpcicsIFsxMDU2OF1dLCBbJ2hhcnInLCBbODU5Nl1dLCBbJ2hBcnInLCBbODY2MF1dLCBbJ2hhcnJ3JywgWzg2MjFdXSwgWydIYXQnLCBbOTRdXSwgWydoYmFyJywgWzg0NjNdXSwgWydIY2lyYycsIFsyOTJdXSwgWydoY2lyYycsIFsyOTNdXSwgWydoZWFydHMnLCBbOTgyOV1dLCBbJ2hlYXJ0c3VpdCcsIFs5ODI5XV0sIFsnaGVsbGlwJywgWzgyMzBdXSwgWydoZXJjb24nLCBbODg4OV1dLCBbJ2hmcicsIFsxMjAxMDFdXSwgWydIZnInLCBbODQ2MF1dLCBbJ0hpbGJlcnRTcGFjZScsIFs4NDU5XV0sIFsnaGtzZWFyb3cnLCBbMTA1MzNdXSwgWydoa3N3YXJvdycsIFsxMDUzNF1dLCBbJ2hvYXJyJywgWzg3MDNdXSwgWydob210aHQnLCBbODc2M11dLCBbJ2hvb2tsZWZ0YXJyb3cnLCBbODYxN11dLCBbJ2hvb2tyaWdodGFycm93JywgWzg2MThdXSwgWydob3BmJywgWzEyMDE1M11dLCBbJ0hvcGYnLCBbODQ2MV1dLCBbJ2hvcmJhcicsIFs4MjEzXV0sIFsnSG9yaXpvbnRhbExpbmUnLCBbOTQ3Ml1dLCBbJ2hzY3InLCBbMTE5OTk3XV0sIFsnSHNjcicsIFs4NDU5XV0sIFsnaHNsYXNoJywgWzg0NjNdXSwgWydIc3Ryb2snLCBbMjk0XV0sIFsnaHN0cm9rJywgWzI5NV1dLCBbJ0h1bXBEb3duSHVtcCcsIFs4NzgyXV0sIFsnSHVtcEVxdWFsJywgWzg3ODNdXSwgWydoeWJ1bGwnLCBbODI1OV1dLCBbJ2h5cGhlbicsIFs4MjA4XV0sIFsnSWFjdXRlJywgWzIwNV1dLCBbJ2lhY3V0ZScsIFsyMzddXSwgWydpYycsIFs4MjkxXV0sIFsnSWNpcmMnLCBbMjA2XV0sIFsnaWNpcmMnLCBbMjM4XV0sIFsnSWN5JywgWzEwNDhdXSwgWydpY3knLCBbMTA4MF1dLCBbJ0lkb3QnLCBbMzA0XV0sIFsnSUVjeScsIFsxMDQ1XV0sIFsnaWVjeScsIFsxMDc3XV0sIFsnaWV4Y2wnLCBbMTYxXV0sIFsnaWZmJywgWzg2NjBdXSwgWydpZnInLCBbMTIwMTAyXV0sIFsnSWZyJywgWzg0NjVdXSwgWydJZ3JhdmUnLCBbMjA0XV0sIFsnaWdyYXZlJywgWzIzNl1dLCBbJ2lpJywgWzg1MjBdXSwgWydpaWlpbnQnLCBbMTA3NjRdXSwgWydpaWludCcsIFs4NzQ5XV0sIFsnaWluZmluJywgWzEwNzE2XV0sIFsnaWlvdGEnLCBbODQ4OV1dLCBbJ0lKbGlnJywgWzMwNl1dLCBbJ2lqbGlnJywgWzMwN11dLCBbJ0ltYWNyJywgWzI5OF1dLCBbJ2ltYWNyJywgWzI5OV1dLCBbJ2ltYWdlJywgWzg0NjVdXSwgWydJbWFnaW5hcnlJJywgWzg1MjBdXSwgWydpbWFnbGluZScsIFs4NDY0XV0sIFsnaW1hZ3BhcnQnLCBbODQ2NV1dLCBbJ2ltYXRoJywgWzMwNV1dLCBbJ0ltJywgWzg0NjVdXSwgWydpbW9mJywgWzg4ODddXSwgWydpbXBlZCcsIFs0MzddXSwgWydJbXBsaWVzJywgWzg2NThdXSwgWydpbmNhcmUnLCBbODQ1M11dLCBbJ2luJywgWzg3MTJdXSwgWydpbmZpbicsIFs4NzM0XV0sIFsnaW5maW50aWUnLCBbMTA3MTddXSwgWydpbm9kb3QnLCBbMzA1XV0sIFsnaW50Y2FsJywgWzg4OTBdXSwgWydpbnQnLCBbODc0N11dLCBbJ0ludCcsIFs4NzQ4XV0sIFsnaW50ZWdlcnMnLCBbODQ4NF1dLCBbJ0ludGVncmFsJywgWzg3NDddXSwgWydpbnRlcmNhbCcsIFs4ODkwXV0sIFsnSW50ZXJzZWN0aW9uJywgWzg4OThdXSwgWydpbnRsYXJoaycsIFsxMDc3NV1dLCBbJ2ludHByb2QnLCBbMTA4MTJdXSwgWydJbnZpc2libGVDb21tYScsIFs4MjkxXV0sIFsnSW52aXNpYmxlVGltZXMnLCBbODI5MF1dLCBbJ0lPY3knLCBbMTAyNV1dLCBbJ2lvY3knLCBbMTEwNV1dLCBbJ0lvZ29uJywgWzMwMl1dLCBbJ2lvZ29uJywgWzMwM11dLCBbJ0lvcGYnLCBbMTIwMTI4XV0sIFsnaW9wZicsIFsxMjAxNTRdXSwgWydJb3RhJywgWzkyMV1dLCBbJ2lvdGEnLCBbOTUzXV0sIFsnaXByb2QnLCBbMTA4MTJdXSwgWydpcXVlc3QnLCBbMTkxXV0sIFsnaXNjcicsIFsxMTk5OThdXSwgWydJc2NyJywgWzg0NjRdXSwgWydpc2luJywgWzg3MTJdXSwgWydpc2luZG90JywgWzg5NDldXSwgWydpc2luRScsIFs4OTUzXV0sIFsnaXNpbnMnLCBbODk0OF1dLCBbJ2lzaW5zdicsIFs4OTQ3XV0sIFsnaXNpbnYnLCBbODcxMl1dLCBbJ2l0JywgWzgyOTBdXSwgWydJdGlsZGUnLCBbMjk2XV0sIFsnaXRpbGRlJywgWzI5N11dLCBbJ0l1a2N5JywgWzEwMzBdXSwgWydpdWtjeScsIFsxMTEwXV0sIFsnSXVtbCcsIFsyMDddXSwgWydpdW1sJywgWzIzOV1dLCBbJ0pjaXJjJywgWzMwOF1dLCBbJ2pjaXJjJywgWzMwOV1dLCBbJ0pjeScsIFsxMDQ5XV0sIFsnamN5JywgWzEwODFdXSwgWydKZnInLCBbMTIwMDc3XV0sIFsnamZyJywgWzEyMDEwM11dLCBbJ2ptYXRoJywgWzU2N11dLCBbJ0pvcGYnLCBbMTIwMTI5XV0sIFsnam9wZicsIFsxMjAxNTVdXSwgWydKc2NyJywgWzExOTk3M11dLCBbJ2pzY3InLCBbMTE5OTk5XV0sIFsnSnNlcmN5JywgWzEwMzJdXSwgWydqc2VyY3knLCBbMTExMl1dLCBbJ0p1a2N5JywgWzEwMjhdXSwgWydqdWtjeScsIFsxMTA4XV0sIFsnS2FwcGEnLCBbOTIyXV0sIFsna2FwcGEnLCBbOTU0XV0sIFsna2FwcGF2JywgWzEwMDhdXSwgWydLY2VkaWwnLCBbMzEwXV0sIFsna2NlZGlsJywgWzMxMV1dLCBbJ0tjeScsIFsxMDUwXV0sIFsna2N5JywgWzEwODJdXSwgWydLZnInLCBbMTIwMDc4XV0sIFsna2ZyJywgWzEyMDEwNF1dLCBbJ2tncmVlbicsIFszMTJdXSwgWydLSGN5JywgWzEwNjFdXSwgWydraGN5JywgWzEwOTNdXSwgWydLSmN5JywgWzEwMzZdXSwgWydramN5JywgWzExMTZdXSwgWydLb3BmJywgWzEyMDEzMF1dLCBbJ2tvcGYnLCBbMTIwMTU2XV0sIFsnS3NjcicsIFsxMTk5NzRdXSwgWydrc2NyJywgWzEyMDAwMF1dLCBbJ2xBYXJyJywgWzg2NjZdXSwgWydMYWN1dGUnLCBbMzEzXV0sIFsnbGFjdXRlJywgWzMxNF1dLCBbJ2xhZW1wdHl2JywgWzEwNjc2XV0sIFsnbGFncmFuJywgWzg0NjZdXSwgWydMYW1iZGEnLCBbOTIzXV0sIFsnbGFtYmRhJywgWzk1NV1dLCBbJ2xhbmcnLCBbMTAyMTZdXSwgWydMYW5nJywgWzEwMjE4XV0sIFsnbGFuZ2QnLCBbMTA2NDFdXSwgWydsYW5nbGUnLCBbMTAyMTZdXSwgWydsYXAnLCBbMTA4ODVdXSwgWydMYXBsYWNldHJmJywgWzg0NjZdXSwgWydsYXF1bycsIFsxNzFdXSwgWydsYXJyYicsIFs4Njc2XV0sIFsnbGFycmJmcycsIFsxMDUyN11dLCBbJ2xhcnInLCBbODU5Ml1dLCBbJ0xhcnInLCBbODYwNl1dLCBbJ2xBcnInLCBbODY1Nl1dLCBbJ2xhcnJmcycsIFsxMDUyNV1dLCBbJ2xhcnJoaycsIFs4NjE3XV0sIFsnbGFycmxwJywgWzg2MTldXSwgWydsYXJycGwnLCBbMTA1NTNdXSwgWydsYXJyc2ltJywgWzEwNjExXV0sIFsnbGFycnRsJywgWzg2MTBdXSwgWydsYXRhaWwnLCBbMTA1MjFdXSwgWydsQXRhaWwnLCBbMTA1MjNdXSwgWydsYXQnLCBbMTA5MjNdXSwgWydsYXRlJywgWzEwOTI1XV0sIFsnbGF0ZXMnLCBbMTA5MjUsIDY1MDI0XV0sIFsnbGJhcnInLCBbMTA1MDhdXSwgWydsQmFycicsIFsxMDUxMF1dLCBbJ2xiYnJrJywgWzEwMDk4XV0sIFsnbGJyYWNlJywgWzEyM11dLCBbJ2xicmFjaycsIFs5MV1dLCBbJ2xicmtlJywgWzEwNjM1XV0sIFsnbGJya3NsZCcsIFsxMDYzOV1dLCBbJ2xicmtzbHUnLCBbMTA2MzddXSwgWydMY2Fyb24nLCBbMzE3XV0sIFsnbGNhcm9uJywgWzMxOF1dLCBbJ0xjZWRpbCcsIFszMTVdXSwgWydsY2VkaWwnLCBbMzE2XV0sIFsnbGNlaWwnLCBbODk2OF1dLCBbJ2xjdWInLCBbMTIzXV0sIFsnTGN5JywgWzEwNTFdXSwgWydsY3knLCBbMTA4M11dLCBbJ2xkY2EnLCBbMTA1NTBdXSwgWydsZHF1bycsIFs4MjIwXV0sIFsnbGRxdW9yJywgWzgyMjJdXSwgWydsZHJkaGFyJywgWzEwNTk5XV0sIFsnbGRydXNoYXInLCBbMTA1NzFdXSwgWydsZHNoJywgWzg2MjZdXSwgWydsZScsIFs4ODA0XV0sIFsnbEUnLCBbODgwNl1dLCBbJ0xlZnRBbmdsZUJyYWNrZXQnLCBbMTAyMTZdXSwgWydMZWZ0QXJyb3dCYXInLCBbODY3Nl1dLCBbJ2xlZnRhcnJvdycsIFs4NTkyXV0sIFsnTGVmdEFycm93JywgWzg1OTJdXSwgWydMZWZ0YXJyb3cnLCBbODY1Nl1dLCBbJ0xlZnRBcnJvd1JpZ2h0QXJyb3cnLCBbODY0Nl1dLCBbJ2xlZnRhcnJvd3RhaWwnLCBbODYxMF1dLCBbJ0xlZnRDZWlsaW5nJywgWzg5NjhdXSwgWydMZWZ0RG91YmxlQnJhY2tldCcsIFsxMDIxNF1dLCBbJ0xlZnREb3duVGVlVmVjdG9yJywgWzEwNTkzXV0sIFsnTGVmdERvd25WZWN0b3JCYXInLCBbMTA1ODVdXSwgWydMZWZ0RG93blZlY3RvcicsIFs4NjQzXV0sIFsnTGVmdEZsb29yJywgWzg5NzBdXSwgWydsZWZ0aGFycG9vbmRvd24nLCBbODYzN11dLCBbJ2xlZnRoYXJwb29udXAnLCBbODYzNl1dLCBbJ2xlZnRsZWZ0YXJyb3dzJywgWzg2NDddXSwgWydsZWZ0cmlnaHRhcnJvdycsIFs4NTk2XV0sIFsnTGVmdFJpZ2h0QXJyb3cnLCBbODU5Nl1dLCBbJ0xlZnRyaWdodGFycm93JywgWzg2NjBdXSwgWydsZWZ0cmlnaHRhcnJvd3MnLCBbODY0Nl1dLCBbJ2xlZnRyaWdodGhhcnBvb25zJywgWzg2NTFdXSwgWydsZWZ0cmlnaHRzcXVpZ2Fycm93JywgWzg2MjFdXSwgWydMZWZ0UmlnaHRWZWN0b3InLCBbMTA1NzRdXSwgWydMZWZ0VGVlQXJyb3cnLCBbODYxMl1dLCBbJ0xlZnRUZWUnLCBbODg2N11dLCBbJ0xlZnRUZWVWZWN0b3InLCBbMTA1ODZdXSwgWydsZWZ0dGhyZWV0aW1lcycsIFs4OTA3XV0sIFsnTGVmdFRyaWFuZ2xlQmFyJywgWzEwNzAzXV0sIFsnTGVmdFRyaWFuZ2xlJywgWzg4ODJdXSwgWydMZWZ0VHJpYW5nbGVFcXVhbCcsIFs4ODg0XV0sIFsnTGVmdFVwRG93blZlY3RvcicsIFsxMDU3N11dLCBbJ0xlZnRVcFRlZVZlY3RvcicsIFsxMDU5Ml1dLCBbJ0xlZnRVcFZlY3RvckJhcicsIFsxMDU4NF1dLCBbJ0xlZnRVcFZlY3RvcicsIFs4NjM5XV0sIFsnTGVmdFZlY3RvckJhcicsIFsxMDU3OF1dLCBbJ0xlZnRWZWN0b3InLCBbODYzNl1dLCBbJ2xFZycsIFsxMDg5MV1dLCBbJ2xlZycsIFs4OTIyXV0sIFsnbGVxJywgWzg4MDRdXSwgWydsZXFxJywgWzg4MDZdXSwgWydsZXFzbGFudCcsIFsxMDg3N11dLCBbJ2xlc2NjJywgWzEwOTIwXV0sIFsnbGVzJywgWzEwODc3XV0sIFsnbGVzZG90JywgWzEwODc5XV0sIFsnbGVzZG90bycsIFsxMDg4MV1dLCBbJ2xlc2RvdG9yJywgWzEwODgzXV0sIFsnbGVzZycsIFs4OTIyLCA2NTAyNF1dLCBbJ2xlc2dlcycsIFsxMDg5OV1dLCBbJ2xlc3NhcHByb3gnLCBbMTA4ODVdXSwgWydsZXNzZG90JywgWzg5MThdXSwgWydsZXNzZXFndHInLCBbODkyMl1dLCBbJ2xlc3NlcXFndHInLCBbMTA4OTFdXSwgWydMZXNzRXF1YWxHcmVhdGVyJywgWzg5MjJdXSwgWydMZXNzRnVsbEVxdWFsJywgWzg4MDZdXSwgWydMZXNzR3JlYXRlcicsIFs4ODIyXV0sIFsnbGVzc2d0cicsIFs4ODIyXV0sIFsnTGVzc0xlc3MnLCBbMTA5MTNdXSwgWydsZXNzc2ltJywgWzg4MThdXSwgWydMZXNzU2xhbnRFcXVhbCcsIFsxMDg3N11dLCBbJ0xlc3NUaWxkZScsIFs4ODE4XV0sIFsnbGZpc2h0JywgWzEwNjIwXV0sIFsnbGZsb29yJywgWzg5NzBdXSwgWydMZnInLCBbMTIwMDc5XV0sIFsnbGZyJywgWzEyMDEwNV1dLCBbJ2xnJywgWzg4MjJdXSwgWydsZ0UnLCBbMTA4OTddXSwgWydsSGFyJywgWzEwNTk0XV0sIFsnbGhhcmQnLCBbODYzN11dLCBbJ2xoYXJ1JywgWzg2MzZdXSwgWydsaGFydWwnLCBbMTA2MDJdXSwgWydsaGJsaycsIFs5NjA0XV0sIFsnTEpjeScsIFsxMDMzXV0sIFsnbGpjeScsIFsxMTEzXV0sIFsnbGxhcnInLCBbODY0N11dLCBbJ2xsJywgWzg4MTBdXSwgWydMbCcsIFs4OTIwXV0sIFsnbGxjb3JuZXInLCBbODk5MF1dLCBbJ0xsZWZ0YXJyb3cnLCBbODY2Nl1dLCBbJ2xsaGFyZCcsIFsxMDYwM11dLCBbJ2xsdHJpJywgWzk3MjJdXSwgWydMbWlkb3QnLCBbMzE5XV0sIFsnbG1pZG90JywgWzMyMF1dLCBbJ2xtb3VzdGFjaGUnLCBbOTEzNl1dLCBbJ2xtb3VzdCcsIFs5MTM2XV0sIFsnbG5hcCcsIFsxMDg4OV1dLCBbJ2xuYXBwcm94JywgWzEwODg5XV0sIFsnbG5lJywgWzEwODg3XV0sIFsnbG5FJywgWzg4MDhdXSwgWydsbmVxJywgWzEwODg3XV0sIFsnbG5lcXEnLCBbODgwOF1dLCBbJ2xuc2ltJywgWzg5MzRdXSwgWydsb2FuZycsIFsxMDIyMF1dLCBbJ2xvYXJyJywgWzg3MDFdXSwgWydsb2JyaycsIFsxMDIxNF1dLCBbJ2xvbmdsZWZ0YXJyb3cnLCBbMTAyMjldXSwgWydMb25nTGVmdEFycm93JywgWzEwMjI5XV0sIFsnTG9uZ2xlZnRhcnJvdycsIFsxMDIzMl1dLCBbJ2xvbmdsZWZ0cmlnaHRhcnJvdycsIFsxMDIzMV1dLCBbJ0xvbmdMZWZ0UmlnaHRBcnJvdycsIFsxMDIzMV1dLCBbJ0xvbmdsZWZ0cmlnaHRhcnJvdycsIFsxMDIzNF1dLCBbJ2xvbmdtYXBzdG8nLCBbMTAyMzZdXSwgWydsb25ncmlnaHRhcnJvdycsIFsxMDIzMF1dLCBbJ0xvbmdSaWdodEFycm93JywgWzEwMjMwXV0sIFsnTG9uZ3JpZ2h0YXJyb3cnLCBbMTAyMzNdXSwgWydsb29wYXJyb3dsZWZ0JywgWzg2MTldXSwgWydsb29wYXJyb3dyaWdodCcsIFs4NjIwXV0sIFsnbG9wYXInLCBbMTA2MjldXSwgWydMb3BmJywgWzEyMDEzMV1dLCBbJ2xvcGYnLCBbMTIwMTU3XV0sIFsnbG9wbHVzJywgWzEwNzk3XV0sIFsnbG90aW1lcycsIFsxMDgwNF1dLCBbJ2xvd2FzdCcsIFs4NzI3XV0sIFsnbG93YmFyJywgWzk1XV0sIFsnTG93ZXJMZWZ0QXJyb3cnLCBbODYwMV1dLCBbJ0xvd2VyUmlnaHRBcnJvdycsIFs4NjAwXV0sIFsnbG96JywgWzk2NzRdXSwgWydsb3plbmdlJywgWzk2NzRdXSwgWydsb3pmJywgWzEwNzMxXV0sIFsnbHBhcicsIFs0MF1dLCBbJ2xwYXJsdCcsIFsxMDY0M11dLCBbJ2xyYXJyJywgWzg2NDZdXSwgWydscmNvcm5lcicsIFs4OTkxXV0sIFsnbHJoYXInLCBbODY1MV1dLCBbJ2xyaGFyZCcsIFsxMDYwNV1dLCBbJ2xybScsIFs4MjA2XV0sIFsnbHJ0cmknLCBbODg5NV1dLCBbJ2xzYXF1bycsIFs4MjQ5XV0sIFsnbHNjcicsIFsxMjAwMDFdXSwgWydMc2NyJywgWzg0NjZdXSwgWydsc2gnLCBbODYyNF1dLCBbJ0xzaCcsIFs4NjI0XV0sIFsnbHNpbScsIFs4ODE4XV0sIFsnbHNpbWUnLCBbMTA4OTNdXSwgWydsc2ltZycsIFsxMDg5NV1dLCBbJ2xzcWInLCBbOTFdXSwgWydsc3F1bycsIFs4MjE2XV0sIFsnbHNxdW9yJywgWzgyMThdXSwgWydMc3Ryb2snLCBbMzIxXV0sIFsnbHN0cm9rJywgWzMyMl1dLCBbJ2x0Y2MnLCBbMTA5MThdXSwgWydsdGNpcicsIFsxMDg3M11dLCBbJ2x0JywgWzYwXV0sIFsnTFQnLCBbNjBdXSwgWydMdCcsIFs4ODEwXV0sIFsnbHRkb3QnLCBbODkxOF1dLCBbJ2x0aHJlZScsIFs4OTA3XV0sIFsnbHRpbWVzJywgWzg5MDVdXSwgWydsdGxhcnInLCBbMTA2MTRdXSwgWydsdHF1ZXN0JywgWzEwODc1XV0sIFsnbHRyaScsIFs5NjY3XV0sIFsnbHRyaWUnLCBbODg4NF1dLCBbJ2x0cmlmJywgWzk2NjZdXSwgWydsdHJQYXInLCBbMTA2NDZdXSwgWydsdXJkc2hhcicsIFsxMDU3MF1dLCBbJ2x1cnVoYXInLCBbMTA1OThdXSwgWydsdmVydG5lcXEnLCBbODgwOCwgNjUwMjRdXSwgWydsdm5FJywgWzg4MDgsIDY1MDI0XV0sIFsnbWFjcicsIFsxNzVdXSwgWydtYWxlJywgWzk3OTRdXSwgWydtYWx0JywgWzEwMDE2XV0sIFsnbWFsdGVzZScsIFsxMDAxNl1dLCBbJ01hcCcsIFsxMDUwMV1dLCBbJ21hcCcsIFs4NjE0XV0sIFsnbWFwc3RvJywgWzg2MTRdXSwgWydtYXBzdG9kb3duJywgWzg2MTVdXSwgWydtYXBzdG9sZWZ0JywgWzg2MTJdXSwgWydtYXBzdG91cCcsIFs4NjEzXV0sIFsnbWFya2VyJywgWzk2NDZdXSwgWydtY29tbWEnLCBbMTA3OTNdXSwgWydNY3knLCBbMTA1Ml1dLCBbJ21jeScsIFsxMDg0XV0sIFsnbWRhc2gnLCBbODIxMl1dLCBbJ21ERG90JywgWzg3NjJdXSwgWydtZWFzdXJlZGFuZ2xlJywgWzg3MzddXSwgWydNZWRpdW1TcGFjZScsIFs4Mjg3XV0sIFsnTWVsbGludHJmJywgWzg0OTldXSwgWydNZnInLCBbMTIwMDgwXV0sIFsnbWZyJywgWzEyMDEwNl1dLCBbJ21obycsIFs4NDg3XV0sIFsnbWljcm8nLCBbMTgxXV0sIFsnbWlkYXN0JywgWzQyXV0sIFsnbWlkY2lyJywgWzEwOTkyXV0sIFsnbWlkJywgWzg3MzldXSwgWydtaWRkb3QnLCBbMTgzXV0sIFsnbWludXNiJywgWzg4NjNdXSwgWydtaW51cycsIFs4NzIyXV0sIFsnbWludXNkJywgWzg3NjBdXSwgWydtaW51c2R1JywgWzEwNzk0XV0sIFsnTWludXNQbHVzJywgWzg3MjNdXSwgWydtbGNwJywgWzEwOTcxXV0sIFsnbWxkcicsIFs4MjMwXV0sIFsnbW5wbHVzJywgWzg3MjNdXSwgWydtb2RlbHMnLCBbODg3MV1dLCBbJ01vcGYnLCBbMTIwMTMyXV0sIFsnbW9wZicsIFsxMjAxNThdXSwgWydtcCcsIFs4NzIzXV0sIFsnbXNjcicsIFsxMjAwMDJdXSwgWydNc2NyJywgWzg0OTldXSwgWydtc3Rwb3MnLCBbODc2Nl1dLCBbJ011JywgWzkyNF1dLCBbJ211JywgWzk1Nl1dLCBbJ211bHRpbWFwJywgWzg4ODhdXSwgWydtdW1hcCcsIFs4ODg4XV0sIFsnbmFibGEnLCBbODcxMV1dLCBbJ05hY3V0ZScsIFszMjNdXSwgWyduYWN1dGUnLCBbMzI0XV0sIFsnbmFuZycsIFs4NzM2LCA4NDAyXV0sIFsnbmFwJywgWzg3NzddXSwgWyduYXBFJywgWzEwODY0LCA4MjRdXSwgWyduYXBpZCcsIFs4Nzc5LCA4MjRdXSwgWyduYXBvcycsIFszMjldXSwgWyduYXBwcm94JywgWzg3NzddXSwgWyduYXR1cmFsJywgWzk4MzhdXSwgWyduYXR1cmFscycsIFs4NDY5XV0sIFsnbmF0dXInLCBbOTgzOF1dLCBbJ25ic3AnLCBbMTYwXV0sIFsnbmJ1bXAnLCBbODc4MiwgODI0XV0sIFsnbmJ1bXBlJywgWzg3ODMsIDgyNF1dLCBbJ25jYXAnLCBbMTA4MTldXSwgWydOY2Fyb24nLCBbMzI3XV0sIFsnbmNhcm9uJywgWzMyOF1dLCBbJ05jZWRpbCcsIFszMjVdXSwgWyduY2VkaWwnLCBbMzI2XV0sIFsnbmNvbmcnLCBbODc3NV1dLCBbJ25jb25nZG90JywgWzEwODYxLCA4MjRdXSwgWyduY3VwJywgWzEwODE4XV0sIFsnTmN5JywgWzEwNTNdXSwgWyduY3knLCBbMTA4NV1dLCBbJ25kYXNoJywgWzgyMTFdXSwgWyduZWFyaGsnLCBbMTA1MzJdXSwgWyduZWFycicsIFs4NTk5XV0sIFsnbmVBcnInLCBbODY2M11dLCBbJ25lYXJyb3cnLCBbODU5OV1dLCBbJ25lJywgWzg4MDBdXSwgWyduZWRvdCcsIFs4Nzg0LCA4MjRdXSwgWydOZWdhdGl2ZU1lZGl1bVNwYWNlJywgWzgyMDNdXSwgWydOZWdhdGl2ZVRoaWNrU3BhY2UnLCBbODIwM11dLCBbJ05lZ2F0aXZlVGhpblNwYWNlJywgWzgyMDNdXSwgWydOZWdhdGl2ZVZlcnlUaGluU3BhY2UnLCBbODIwM11dLCBbJ25lcXVpdicsIFs4ODAyXV0sIFsnbmVzZWFyJywgWzEwNTM2XV0sIFsnbmVzaW0nLCBbODc3MCwgODI0XV0sIFsnTmVzdGVkR3JlYXRlckdyZWF0ZXInLCBbODgxMV1dLCBbJ05lc3RlZExlc3NMZXNzJywgWzg4MTBdXSwgWyduZXhpc3QnLCBbODcwOF1dLCBbJ25leGlzdHMnLCBbODcwOF1dLCBbJ05mcicsIFsxMjAwODFdXSwgWyduZnInLCBbMTIwMTA3XV0sIFsnbmdFJywgWzg4MDcsIDgyNF1dLCBbJ25nZScsIFs4ODE3XV0sIFsnbmdlcScsIFs4ODE3XV0sIFsnbmdlcXEnLCBbODgwNywgODI0XV0sIFsnbmdlcXNsYW50JywgWzEwODc4LCA4MjRdXSwgWyduZ2VzJywgWzEwODc4LCA4MjRdXSwgWyduR2cnLCBbODkyMSwgODI0XV0sIFsnbmdzaW0nLCBbODgyMV1dLCBbJ25HdCcsIFs4ODExLCA4NDAyXV0sIFsnbmd0JywgWzg4MTVdXSwgWyduZ3RyJywgWzg4MTVdXSwgWyduR3R2JywgWzg4MTEsIDgyNF1dLCBbJ25oYXJyJywgWzg2MjJdXSwgWyduaEFycicsIFs4NjU0XV0sIFsnbmhwYXInLCBbMTA5OTRdXSwgWyduaScsIFs4NzE1XV0sIFsnbmlzJywgWzg5NTZdXSwgWyduaXNkJywgWzg5NTRdXSwgWyduaXYnLCBbODcxNV1dLCBbJ05KY3knLCBbMTAzNF1dLCBbJ25qY3knLCBbMTExNF1dLCBbJ25sYXJyJywgWzg2MDJdXSwgWydubEFycicsIFs4NjUzXV0sIFsnbmxkcicsIFs4MjI5XV0sIFsnbmxFJywgWzg4MDYsIDgyNF1dLCBbJ25sZScsIFs4ODE2XV0sIFsnbmxlZnRhcnJvdycsIFs4NjAyXV0sIFsnbkxlZnRhcnJvdycsIFs4NjUzXV0sIFsnbmxlZnRyaWdodGFycm93JywgWzg2MjJdXSwgWyduTGVmdHJpZ2h0YXJyb3cnLCBbODY1NF1dLCBbJ25sZXEnLCBbODgxNl1dLCBbJ25sZXFxJywgWzg4MDYsIDgyNF1dLCBbJ25sZXFzbGFudCcsIFsxMDg3NywgODI0XV0sIFsnbmxlcycsIFsxMDg3NywgODI0XV0sIFsnbmxlc3MnLCBbODgxNF1dLCBbJ25MbCcsIFs4OTIwLCA4MjRdXSwgWydubHNpbScsIFs4ODIwXV0sIFsnbkx0JywgWzg4MTAsIDg0MDJdXSwgWydubHQnLCBbODgxNF1dLCBbJ25sdHJpJywgWzg5MzhdXSwgWydubHRyaWUnLCBbODk0MF1dLCBbJ25MdHYnLCBbODgxMCwgODI0XV0sIFsnbm1pZCcsIFs4NzQwXV0sIFsnTm9CcmVhaycsIFs4Mjg4XV0sIFsnTm9uQnJlYWtpbmdTcGFjZScsIFsxNjBdXSwgWydub3BmJywgWzEyMDE1OV1dLCBbJ05vcGYnLCBbODQ2OV1dLCBbJ05vdCcsIFsxMDk4OF1dLCBbJ25vdCcsIFsxNzJdXSwgWydOb3RDb25ncnVlbnQnLCBbODgwMl1dLCBbJ05vdEN1cENhcCcsIFs4ODEzXV0sIFsnTm90RG91YmxlVmVydGljYWxCYXInLCBbODc0Ml1dLCBbJ05vdEVsZW1lbnQnLCBbODcxM11dLCBbJ05vdEVxdWFsJywgWzg4MDBdXSwgWydOb3RFcXVhbFRpbGRlJywgWzg3NzAsIDgyNF1dLCBbJ05vdEV4aXN0cycsIFs4NzA4XV0sIFsnTm90R3JlYXRlcicsIFs4ODE1XV0sIFsnTm90R3JlYXRlckVxdWFsJywgWzg4MTddXSwgWydOb3RHcmVhdGVyRnVsbEVxdWFsJywgWzg4MDcsIDgyNF1dLCBbJ05vdEdyZWF0ZXJHcmVhdGVyJywgWzg4MTEsIDgyNF1dLCBbJ05vdEdyZWF0ZXJMZXNzJywgWzg4MjVdXSwgWydOb3RHcmVhdGVyU2xhbnRFcXVhbCcsIFsxMDg3OCwgODI0XV0sIFsnTm90R3JlYXRlclRpbGRlJywgWzg4MjFdXSwgWydOb3RIdW1wRG93bkh1bXAnLCBbODc4MiwgODI0XV0sIFsnTm90SHVtcEVxdWFsJywgWzg3ODMsIDgyNF1dLCBbJ25vdGluJywgWzg3MTNdXSwgWydub3RpbmRvdCcsIFs4OTQ5LCA4MjRdXSwgWydub3RpbkUnLCBbODk1MywgODI0XV0sIFsnbm90aW52YScsIFs4NzEzXV0sIFsnbm90aW52YicsIFs4OTUxXV0sIFsnbm90aW52YycsIFs4OTUwXV0sIFsnTm90TGVmdFRyaWFuZ2xlQmFyJywgWzEwNzAzLCA4MjRdXSwgWydOb3RMZWZ0VHJpYW5nbGUnLCBbODkzOF1dLCBbJ05vdExlZnRUcmlhbmdsZUVxdWFsJywgWzg5NDBdXSwgWydOb3RMZXNzJywgWzg4MTRdXSwgWydOb3RMZXNzRXF1YWwnLCBbODgxNl1dLCBbJ05vdExlc3NHcmVhdGVyJywgWzg4MjRdXSwgWydOb3RMZXNzTGVzcycsIFs4ODEwLCA4MjRdXSwgWydOb3RMZXNzU2xhbnRFcXVhbCcsIFsxMDg3NywgODI0XV0sIFsnTm90TGVzc1RpbGRlJywgWzg4MjBdXSwgWydOb3ROZXN0ZWRHcmVhdGVyR3JlYXRlcicsIFsxMDkxNCwgODI0XV0sIFsnTm90TmVzdGVkTGVzc0xlc3MnLCBbMTA5MTMsIDgyNF1dLCBbJ25vdG5pJywgWzg3MTZdXSwgWydub3RuaXZhJywgWzg3MTZdXSwgWydub3RuaXZiJywgWzg5NThdXSwgWydub3RuaXZjJywgWzg5NTddXSwgWydOb3RQcmVjZWRlcycsIFs4ODMyXV0sIFsnTm90UHJlY2VkZXNFcXVhbCcsIFsxMDkyNywgODI0XV0sIFsnTm90UHJlY2VkZXNTbGFudEVxdWFsJywgWzg5MjhdXSwgWydOb3RSZXZlcnNlRWxlbWVudCcsIFs4NzE2XV0sIFsnTm90UmlnaHRUcmlhbmdsZUJhcicsIFsxMDcwNCwgODI0XV0sIFsnTm90UmlnaHRUcmlhbmdsZScsIFs4OTM5XV0sIFsnTm90UmlnaHRUcmlhbmdsZUVxdWFsJywgWzg5NDFdXSwgWydOb3RTcXVhcmVTdWJzZXQnLCBbODg0NywgODI0XV0sIFsnTm90U3F1YXJlU3Vic2V0RXF1YWwnLCBbODkzMF1dLCBbJ05vdFNxdWFyZVN1cGVyc2V0JywgWzg4NDgsIDgyNF1dLCBbJ05vdFNxdWFyZVN1cGVyc2V0RXF1YWwnLCBbODkzMV1dLCBbJ05vdFN1YnNldCcsIFs4ODM0LCA4NDAyXV0sIFsnTm90U3Vic2V0RXF1YWwnLCBbODg0MF1dLCBbJ05vdFN1Y2NlZWRzJywgWzg4MzNdXSwgWydOb3RTdWNjZWVkc0VxdWFsJywgWzEwOTI4LCA4MjRdXSwgWydOb3RTdWNjZWVkc1NsYW50RXF1YWwnLCBbODkyOV1dLCBbJ05vdFN1Y2NlZWRzVGlsZGUnLCBbODgzMSwgODI0XV0sIFsnTm90U3VwZXJzZXQnLCBbODgzNSwgODQwMl1dLCBbJ05vdFN1cGVyc2V0RXF1YWwnLCBbODg0MV1dLCBbJ05vdFRpbGRlJywgWzg3NjldXSwgWydOb3RUaWxkZUVxdWFsJywgWzg3NzJdXSwgWydOb3RUaWxkZUZ1bGxFcXVhbCcsIFs4Nzc1XV0sIFsnTm90VGlsZGVUaWxkZScsIFs4Nzc3XV0sIFsnTm90VmVydGljYWxCYXInLCBbODc0MF1dLCBbJ25wYXJhbGxlbCcsIFs4NzQyXV0sIFsnbnBhcicsIFs4NzQyXV0sIFsnbnBhcnNsJywgWzExMDA1LCA4NDIxXV0sIFsnbnBhcnQnLCBbODcwNiwgODI0XV0sIFsnbnBvbGludCcsIFsxMDc3Ml1dLCBbJ25wcicsIFs4ODMyXV0sIFsnbnByY3VlJywgWzg5MjhdXSwgWyducHJlYycsIFs4ODMyXV0sIFsnbnByZWNlcScsIFsxMDkyNywgODI0XV0sIFsnbnByZScsIFsxMDkyNywgODI0XV0sIFsnbnJhcnJjJywgWzEwNTQ3LCA4MjRdXSwgWyducmFycicsIFs4NjAzXV0sIFsnbnJBcnInLCBbODY1NV1dLCBbJ25yYXJydycsIFs4NjA1LCA4MjRdXSwgWyducmlnaHRhcnJvdycsIFs4NjAzXV0sIFsnblJpZ2h0YXJyb3cnLCBbODY1NV1dLCBbJ25ydHJpJywgWzg5MzldXSwgWyducnRyaWUnLCBbODk0MV1dLCBbJ25zYycsIFs4ODMzXV0sIFsnbnNjY3VlJywgWzg5MjldXSwgWyduc2NlJywgWzEwOTI4LCA4MjRdXSwgWydOc2NyJywgWzExOTk3N11dLCBbJ25zY3InLCBbMTIwMDAzXV0sIFsnbnNob3J0bWlkJywgWzg3NDBdXSwgWyduc2hvcnRwYXJhbGxlbCcsIFs4NzQyXV0sIFsnbnNpbScsIFs4NzY5XV0sIFsnbnNpbWUnLCBbODc3Ml1dLCBbJ25zaW1lcScsIFs4NzcyXV0sIFsnbnNtaWQnLCBbODc0MF1dLCBbJ25zcGFyJywgWzg3NDJdXSwgWyduc3FzdWJlJywgWzg5MzBdXSwgWyduc3FzdXBlJywgWzg5MzFdXSwgWyduc3ViJywgWzg4MzZdXSwgWyduc3ViRScsIFsxMDk0OSwgODI0XV0sIFsnbnN1YmUnLCBbODg0MF1dLCBbJ25zdWJzZXQnLCBbODgzNCwgODQwMl1dLCBbJ25zdWJzZXRlcScsIFs4ODQwXV0sIFsnbnN1YnNldGVxcScsIFsxMDk0OSwgODI0XV0sIFsnbnN1Y2MnLCBbODgzM11dLCBbJ25zdWNjZXEnLCBbMTA5MjgsIDgyNF1dLCBbJ25zdXAnLCBbODgzN11dLCBbJ25zdXBFJywgWzEwOTUwLCA4MjRdXSwgWyduc3VwZScsIFs4ODQxXV0sIFsnbnN1cHNldCcsIFs4ODM1LCA4NDAyXV0sIFsnbnN1cHNldGVxJywgWzg4NDFdXSwgWyduc3Vwc2V0ZXFxJywgWzEwOTUwLCA4MjRdXSwgWydudGdsJywgWzg4MjVdXSwgWydOdGlsZGUnLCBbMjA5XV0sIFsnbnRpbGRlJywgWzI0MV1dLCBbJ250bGcnLCBbODgyNF1dLCBbJ250cmlhbmdsZWxlZnQnLCBbODkzOF1dLCBbJ250cmlhbmdsZWxlZnRlcScsIFs4OTQwXV0sIFsnbnRyaWFuZ2xlcmlnaHQnLCBbODkzOV1dLCBbJ250cmlhbmdsZXJpZ2h0ZXEnLCBbODk0MV1dLCBbJ051JywgWzkyNV1dLCBbJ251JywgWzk1N11dLCBbJ251bScsIFszNV1dLCBbJ251bWVybycsIFs4NDcwXV0sIFsnbnVtc3AnLCBbODE5OV1dLCBbJ252YXAnLCBbODc4MSwgODQwMl1dLCBbJ252ZGFzaCcsIFs4ODc2XV0sIFsnbnZEYXNoJywgWzg4NzddXSwgWyduVmRhc2gnLCBbODg3OF1dLCBbJ25WRGFzaCcsIFs4ODc5XV0sIFsnbnZnZScsIFs4ODA1LCA4NDAyXV0sIFsnbnZndCcsIFs2MiwgODQwMl1dLCBbJ252SGFycicsIFsxMDUwMF1dLCBbJ252aW5maW4nLCBbMTA3MThdXSwgWydudmxBcnInLCBbMTA0OThdXSwgWydudmxlJywgWzg4MDQsIDg0MDJdXSwgWydudmx0JywgWzYwLCA4NDAyXV0sIFsnbnZsdHJpZScsIFs4ODg0LCA4NDAyXV0sIFsnbnZyQXJyJywgWzEwNDk5XV0sIFsnbnZydHJpZScsIFs4ODg1LCA4NDAyXV0sIFsnbnZzaW0nLCBbODc2NCwgODQwMl1dLCBbJ253YXJoaycsIFsxMDUzMV1dLCBbJ253YXJyJywgWzg1OThdXSwgWydud0FycicsIFs4NjYyXV0sIFsnbndhcnJvdycsIFs4NTk4XV0sIFsnbnduZWFyJywgWzEwNTM1XV0sIFsnT2FjdXRlJywgWzIxMV1dLCBbJ29hY3V0ZScsIFsyNDNdXSwgWydvYXN0JywgWzg4NTldXSwgWydPY2lyYycsIFsyMTJdXSwgWydvY2lyYycsIFsyNDRdXSwgWydvY2lyJywgWzg4NThdXSwgWydPY3knLCBbMTA1NF1dLCBbJ29jeScsIFsxMDg2XV0sIFsnb2Rhc2gnLCBbODg2MV1dLCBbJ09kYmxhYycsIFszMzZdXSwgWydvZGJsYWMnLCBbMzM3XV0sIFsnb2RpdicsIFsxMDgwOF1dLCBbJ29kb3QnLCBbODg1N11dLCBbJ29kc29sZCcsIFsxMDY4NF1dLCBbJ09FbGlnJywgWzMzOF1dLCBbJ29lbGlnJywgWzMzOV1dLCBbJ29mY2lyJywgWzEwNjg3XV0sIFsnT2ZyJywgWzEyMDA4Ml1dLCBbJ29mcicsIFsxMjAxMDhdXSwgWydvZ29uJywgWzczMV1dLCBbJ09ncmF2ZScsIFsyMTBdXSwgWydvZ3JhdmUnLCBbMjQyXV0sIFsnb2d0JywgWzEwNjg5XV0sIFsnb2hiYXInLCBbMTA2NzddXSwgWydvaG0nLCBbOTM3XV0sIFsnb2ludCcsIFs4NzUwXV0sIFsnb2xhcnInLCBbODYzNF1dLCBbJ29sY2lyJywgWzEwNjg2XV0sIFsnb2xjcm9zcycsIFsxMDY4M11dLCBbJ29saW5lJywgWzgyNTRdXSwgWydvbHQnLCBbMTA2ODhdXSwgWydPbWFjcicsIFszMzJdXSwgWydvbWFjcicsIFszMzNdXSwgWydPbWVnYScsIFs5MzddXSwgWydvbWVnYScsIFs5NjldXSwgWydPbWljcm9uJywgWzkyN11dLCBbJ29taWNyb24nLCBbOTU5XV0sIFsnb21pZCcsIFsxMDY3OF1dLCBbJ29taW51cycsIFs4ODU0XV0sIFsnT29wZicsIFsxMjAxMzRdXSwgWydvb3BmJywgWzEyMDE2MF1dLCBbJ29wYXInLCBbMTA2NzldXSwgWydPcGVuQ3VybHlEb3VibGVRdW90ZScsIFs4MjIwXV0sIFsnT3BlbkN1cmx5UXVvdGUnLCBbODIxNl1dLCBbJ29wZXJwJywgWzEwNjgxXV0sIFsnb3BsdXMnLCBbODg1M11dLCBbJ29yYXJyJywgWzg2MzVdXSwgWydPcicsIFsxMDgzNl1dLCBbJ29yJywgWzg3NDRdXSwgWydvcmQnLCBbMTA4NDVdXSwgWydvcmRlcicsIFs4NTAwXV0sIFsnb3JkZXJvZicsIFs4NTAwXV0sIFsnb3JkZicsIFsxNzBdXSwgWydvcmRtJywgWzE4Nl1dLCBbJ29yaWdvZicsIFs4ODg2XV0sIFsnb3JvcicsIFsxMDgzOF1dLCBbJ29yc2xvcGUnLCBbMTA4MzldXSwgWydvcnYnLCBbMTA4NDNdXSwgWydvUycsIFs5NDE2XV0sIFsnT3NjcicsIFsxMTk5NzhdXSwgWydvc2NyJywgWzg1MDBdXSwgWydPc2xhc2gnLCBbMjE2XV0sIFsnb3NsYXNoJywgWzI0OF1dLCBbJ29zb2wnLCBbODg1Nl1dLCBbJ090aWxkZScsIFsyMTNdXSwgWydvdGlsZGUnLCBbMjQ1XV0sIFsnb3RpbWVzYXMnLCBbMTA4MDZdXSwgWydPdGltZXMnLCBbMTA4MDddXSwgWydvdGltZXMnLCBbODg1NV1dLCBbJ091bWwnLCBbMjE0XV0sIFsnb3VtbCcsIFsyNDZdXSwgWydvdmJhcicsIFs5MDIxXV0sIFsnT3ZlckJhcicsIFs4MjU0XV0sIFsnT3ZlckJyYWNlJywgWzkxODJdXSwgWydPdmVyQnJhY2tldCcsIFs5MTQwXV0sIFsnT3ZlclBhcmVudGhlc2lzJywgWzkxODBdXSwgWydwYXJhJywgWzE4Ml1dLCBbJ3BhcmFsbGVsJywgWzg3NDFdXSwgWydwYXInLCBbODc0MV1dLCBbJ3BhcnNpbScsIFsxMDk5NV1dLCBbJ3BhcnNsJywgWzExMDA1XV0sIFsncGFydCcsIFs4NzA2XV0sIFsnUGFydGlhbEQnLCBbODcwNl1dLCBbJ1BjeScsIFsxMDU1XV0sIFsncGN5JywgWzEwODddXSwgWydwZXJjbnQnLCBbMzddXSwgWydwZXJpb2QnLCBbNDZdXSwgWydwZXJtaWwnLCBbODI0MF1dLCBbJ3BlcnAnLCBbODg2OV1dLCBbJ3BlcnRlbmsnLCBbODI0MV1dLCBbJ1BmcicsIFsxMjAwODNdXSwgWydwZnInLCBbMTIwMTA5XV0sIFsnUGhpJywgWzkzNF1dLCBbJ3BoaScsIFs5NjZdXSwgWydwaGl2JywgWzk4MV1dLCBbJ3BobW1hdCcsIFs4NDk5XV0sIFsncGhvbmUnLCBbOTc0Ml1dLCBbJ1BpJywgWzkyOF1dLCBbJ3BpJywgWzk2MF1dLCBbJ3BpdGNoZm9yaycsIFs4OTE2XV0sIFsncGl2JywgWzk4Ml1dLCBbJ3BsYW5jaycsIFs4NDYzXV0sIFsncGxhbmNraCcsIFs4NDYyXV0sIFsncGxhbmt2JywgWzg0NjNdXSwgWydwbHVzYWNpcicsIFsxMDc4N11dLCBbJ3BsdXNiJywgWzg4NjJdXSwgWydwbHVzY2lyJywgWzEwNzg2XV0sIFsncGx1cycsIFs0M11dLCBbJ3BsdXNkbycsIFs4NzI0XV0sIFsncGx1c2R1JywgWzEwNzg5XV0sIFsncGx1c2UnLCBbMTA4NjZdXSwgWydQbHVzTWludXMnLCBbMTc3XV0sIFsncGx1c21uJywgWzE3N11dLCBbJ3BsdXNzaW0nLCBbMTA3OTBdXSwgWydwbHVzdHdvJywgWzEwNzkxXV0sIFsncG0nLCBbMTc3XV0sIFsnUG9pbmNhcmVwbGFuZScsIFs4NDYwXV0sIFsncG9pbnRpbnQnLCBbMTA3NzNdXSwgWydwb3BmJywgWzEyMDE2MV1dLCBbJ1BvcGYnLCBbODQ3M11dLCBbJ3BvdW5kJywgWzE2M11dLCBbJ3ByYXAnLCBbMTA5MzVdXSwgWydQcicsIFsxMDkzOV1dLCBbJ3ByJywgWzg4MjZdXSwgWydwcmN1ZScsIFs4ODI4XV0sIFsncHJlY2FwcHJveCcsIFsxMDkzNV1dLCBbJ3ByZWMnLCBbODgyNl1dLCBbJ3ByZWNjdXJseWVxJywgWzg4MjhdXSwgWydQcmVjZWRlcycsIFs4ODI2XV0sIFsnUHJlY2VkZXNFcXVhbCcsIFsxMDkyN11dLCBbJ1ByZWNlZGVzU2xhbnRFcXVhbCcsIFs4ODI4XV0sIFsnUHJlY2VkZXNUaWxkZScsIFs4ODMwXV0sIFsncHJlY2VxJywgWzEwOTI3XV0sIFsncHJlY25hcHByb3gnLCBbMTA5MzddXSwgWydwcmVjbmVxcScsIFsxMDkzM11dLCBbJ3ByZWNuc2ltJywgWzg5MzZdXSwgWydwcmUnLCBbMTA5MjddXSwgWydwckUnLCBbMTA5MzFdXSwgWydwcmVjc2ltJywgWzg4MzBdXSwgWydwcmltZScsIFs4MjQyXV0sIFsnUHJpbWUnLCBbODI0M11dLCBbJ3ByaW1lcycsIFs4NDczXV0sIFsncHJuYXAnLCBbMTA5MzddXSwgWydwcm5FJywgWzEwOTMzXV0sIFsncHJuc2ltJywgWzg5MzZdXSwgWydwcm9kJywgWzg3MTldXSwgWydQcm9kdWN0JywgWzg3MTldXSwgWydwcm9mYWxhcicsIFs5MDA2XV0sIFsncHJvZmxpbmUnLCBbODk3OF1dLCBbJ3Byb2ZzdXJmJywgWzg5NzldXSwgWydwcm9wJywgWzg3MzNdXSwgWydQcm9wb3J0aW9uYWwnLCBbODczM11dLCBbJ1Byb3BvcnRpb24nLCBbODc1OV1dLCBbJ3Byb3B0bycsIFs4NzMzXV0sIFsncHJzaW0nLCBbODgzMF1dLCBbJ3BydXJlbCcsIFs4ODgwXV0sIFsnUHNjcicsIFsxMTk5NzldXSwgWydwc2NyJywgWzEyMDAwNV1dLCBbJ1BzaScsIFs5MzZdXSwgWydwc2knLCBbOTY4XV0sIFsncHVuY3NwJywgWzgyMDBdXSwgWydRZnInLCBbMTIwMDg0XV0sIFsncWZyJywgWzEyMDExMF1dLCBbJ3FpbnQnLCBbMTA3NjRdXSwgWydxb3BmJywgWzEyMDE2Ml1dLCBbJ1FvcGYnLCBbODQ3NF1dLCBbJ3FwcmltZScsIFs4Mjc5XV0sIFsnUXNjcicsIFsxMTk5ODBdXSwgWydxc2NyJywgWzEyMDAwNl1dLCBbJ3F1YXRlcm5pb25zJywgWzg0NjFdXSwgWydxdWF0aW50JywgWzEwNzc0XV0sIFsncXVlc3QnLCBbNjNdXSwgWydxdWVzdGVxJywgWzg3OTldXSwgWydxdW90JywgWzM0XV0sIFsnUVVPVCcsIFszNF1dLCBbJ3JBYXJyJywgWzg2NjddXSwgWydyYWNlJywgWzg3NjUsIDgxN11dLCBbJ1JhY3V0ZScsIFszNDBdXSwgWydyYWN1dGUnLCBbMzQxXV0sIFsncmFkaWMnLCBbODczMF1dLCBbJ3JhZW1wdHl2JywgWzEwNjc1XV0sIFsncmFuZycsIFsxMDIxN11dLCBbJ1JhbmcnLCBbMTAyMTldXSwgWydyYW5nZCcsIFsxMDY0Ml1dLCBbJ3JhbmdlJywgWzEwNjYxXV0sIFsncmFuZ2xlJywgWzEwMjE3XV0sIFsncmFxdW8nLCBbMTg3XV0sIFsncmFycmFwJywgWzEwNjEzXV0sIFsncmFycmInLCBbODY3N11dLCBbJ3JhcnJiZnMnLCBbMTA1MjhdXSwgWydyYXJyYycsIFsxMDU0N11dLCBbJ3JhcnInLCBbODU5NF1dLCBbJ1JhcnInLCBbODYwOF1dLCBbJ3JBcnInLCBbODY1OF1dLCBbJ3JhcnJmcycsIFsxMDUyNl1dLCBbJ3JhcnJoaycsIFs4NjE4XV0sIFsncmFycmxwJywgWzg2MjBdXSwgWydyYXJycGwnLCBbMTA1NjVdXSwgWydyYXJyc2ltJywgWzEwNjEyXV0sIFsnUmFycnRsJywgWzEwNTE4XV0sIFsncmFycnRsJywgWzg2MTFdXSwgWydyYXJydycsIFs4NjA1XV0sIFsncmF0YWlsJywgWzEwNTIyXV0sIFsnckF0YWlsJywgWzEwNTI0XV0sIFsncmF0aW8nLCBbODc1OF1dLCBbJ3JhdGlvbmFscycsIFs4NDc0XV0sIFsncmJhcnInLCBbMTA1MDldXSwgWydyQmFycicsIFsxMDUxMV1dLCBbJ1JCYXJyJywgWzEwNTEyXV0sIFsncmJicmsnLCBbMTAwOTldXSwgWydyYnJhY2UnLCBbMTI1XV0sIFsncmJyYWNrJywgWzkzXV0sIFsncmJya2UnLCBbMTA2MzZdXSwgWydyYnJrc2xkJywgWzEwNjM4XV0sIFsncmJya3NsdScsIFsxMDY0MF1dLCBbJ1JjYXJvbicsIFszNDRdXSwgWydyY2Fyb24nLCBbMzQ1XV0sIFsnUmNlZGlsJywgWzM0Ml1dLCBbJ3JjZWRpbCcsIFszNDNdXSwgWydyY2VpbCcsIFs4OTY5XV0sIFsncmN1YicsIFsxMjVdXSwgWydSY3knLCBbMTA1Nl1dLCBbJ3JjeScsIFsxMDg4XV0sIFsncmRjYScsIFsxMDU1MV1dLCBbJ3JkbGRoYXInLCBbMTA2MDFdXSwgWydyZHF1bycsIFs4MjIxXV0sIFsncmRxdW9yJywgWzgyMjFdXSwgWydDbG9zZUN1cmx5RG91YmxlUXVvdGUnLCBbODIyMV1dLCBbJ3Jkc2gnLCBbODYyN11dLCBbJ3JlYWwnLCBbODQ3Nl1dLCBbJ3JlYWxpbmUnLCBbODQ3NV1dLCBbJ3JlYWxwYXJ0JywgWzg0NzZdXSwgWydyZWFscycsIFs4NDc3XV0sIFsnUmUnLCBbODQ3Nl1dLCBbJ3JlY3QnLCBbOTY0NV1dLCBbJ3JlZycsIFsxNzRdXSwgWydSRUcnLCBbMTc0XV0sIFsnUmV2ZXJzZUVsZW1lbnQnLCBbODcxNV1dLCBbJ1JldmVyc2VFcXVpbGlicml1bScsIFs4NjUxXV0sIFsnUmV2ZXJzZVVwRXF1aWxpYnJpdW0nLCBbMTA2MDddXSwgWydyZmlzaHQnLCBbMTA2MjFdXSwgWydyZmxvb3InLCBbODk3MV1dLCBbJ3JmcicsIFsxMjAxMTFdXSwgWydSZnInLCBbODQ3Nl1dLCBbJ3JIYXInLCBbMTA1OTZdXSwgWydyaGFyZCcsIFs4NjQxXV0sIFsncmhhcnUnLCBbODY0MF1dLCBbJ3JoYXJ1bCcsIFsxMDYwNF1dLCBbJ1JobycsIFs5MjldXSwgWydyaG8nLCBbOTYxXV0sIFsncmhvdicsIFsxMDA5XV0sIFsnUmlnaHRBbmdsZUJyYWNrZXQnLCBbMTAyMTddXSwgWydSaWdodEFycm93QmFyJywgWzg2NzddXSwgWydyaWdodGFycm93JywgWzg1OTRdXSwgWydSaWdodEFycm93JywgWzg1OTRdXSwgWydSaWdodGFycm93JywgWzg2NThdXSwgWydSaWdodEFycm93TGVmdEFycm93JywgWzg2NDRdXSwgWydyaWdodGFycm93dGFpbCcsIFs4NjExXV0sIFsnUmlnaHRDZWlsaW5nJywgWzg5NjldXSwgWydSaWdodERvdWJsZUJyYWNrZXQnLCBbMTAyMTVdXSwgWydSaWdodERvd25UZWVWZWN0b3InLCBbMTA1ODldXSwgWydSaWdodERvd25WZWN0b3JCYXInLCBbMTA1ODFdXSwgWydSaWdodERvd25WZWN0b3InLCBbODY0Ml1dLCBbJ1JpZ2h0Rmxvb3InLCBbODk3MV1dLCBbJ3JpZ2h0aGFycG9vbmRvd24nLCBbODY0MV1dLCBbJ3JpZ2h0aGFycG9vbnVwJywgWzg2NDBdXSwgWydyaWdodGxlZnRhcnJvd3MnLCBbODY0NF1dLCBbJ3JpZ2h0bGVmdGhhcnBvb25zJywgWzg2NTJdXSwgWydyaWdodHJpZ2h0YXJyb3dzJywgWzg2NDldXSwgWydyaWdodHNxdWlnYXJyb3cnLCBbODYwNV1dLCBbJ1JpZ2h0VGVlQXJyb3cnLCBbODYxNF1dLCBbJ1JpZ2h0VGVlJywgWzg4NjZdXSwgWydSaWdodFRlZVZlY3RvcicsIFsxMDU4N11dLCBbJ3JpZ2h0dGhyZWV0aW1lcycsIFs4OTA4XV0sIFsnUmlnaHRUcmlhbmdsZUJhcicsIFsxMDcwNF1dLCBbJ1JpZ2h0VHJpYW5nbGUnLCBbODg4M11dLCBbJ1JpZ2h0VHJpYW5nbGVFcXVhbCcsIFs4ODg1XV0sIFsnUmlnaHRVcERvd25WZWN0b3InLCBbMTA1NzVdXSwgWydSaWdodFVwVGVlVmVjdG9yJywgWzEwNTg4XV0sIFsnUmlnaHRVcFZlY3RvckJhcicsIFsxMDU4MF1dLCBbJ1JpZ2h0VXBWZWN0b3InLCBbODYzOF1dLCBbJ1JpZ2h0VmVjdG9yQmFyJywgWzEwNTc5XV0sIFsnUmlnaHRWZWN0b3InLCBbODY0MF1dLCBbJ3JpbmcnLCBbNzMwXV0sIFsncmlzaW5nZG90c2VxJywgWzg3ODddXSwgWydybGFycicsIFs4NjQ0XV0sIFsncmxoYXInLCBbODY1Ml1dLCBbJ3JsbScsIFs4MjA3XV0sIFsncm1vdXN0YWNoZScsIFs5MTM3XV0sIFsncm1vdXN0JywgWzkxMzddXSwgWydybm1pZCcsIFsxMDk5MF1dLCBbJ3JvYW5nJywgWzEwMjIxXV0sIFsncm9hcnInLCBbODcwMl1dLCBbJ3JvYnJrJywgWzEwMjE1XV0sIFsncm9wYXInLCBbMTA2MzBdXSwgWydyb3BmJywgWzEyMDE2M11dLCBbJ1JvcGYnLCBbODQ3N11dLCBbJ3JvcGx1cycsIFsxMDc5OF1dLCBbJ3JvdGltZXMnLCBbMTA4MDVdXSwgWydSb3VuZEltcGxpZXMnLCBbMTA2MDhdXSwgWydycGFyJywgWzQxXV0sIFsncnBhcmd0JywgWzEwNjQ0XV0sIFsncnBwb2xpbnQnLCBbMTA3NzBdXSwgWydycmFycicsIFs4NjQ5XV0sIFsnUnJpZ2h0YXJyb3cnLCBbODY2N11dLCBbJ3JzYXF1bycsIFs4MjUwXV0sIFsncnNjcicsIFsxMjAwMDddXSwgWydSc2NyJywgWzg0NzVdXSwgWydyc2gnLCBbODYyNV1dLCBbJ1JzaCcsIFs4NjI1XV0sIFsncnNxYicsIFs5M11dLCBbJ3JzcXVvJywgWzgyMTddXSwgWydyc3F1b3InLCBbODIxN11dLCBbJ0Nsb3NlQ3VybHlRdW90ZScsIFs4MjE3XV0sIFsncnRocmVlJywgWzg5MDhdXSwgWydydGltZXMnLCBbODkwNl1dLCBbJ3J0cmknLCBbOTY1N11dLCBbJ3J0cmllJywgWzg4ODVdXSwgWydydHJpZicsIFs5NjU2XV0sIFsncnRyaWx0cmknLCBbMTA3MDJdXSwgWydSdWxlRGVsYXllZCcsIFsxMDc0MF1dLCBbJ3J1bHVoYXInLCBbMTA2MDBdXSwgWydyeCcsIFs4NDc4XV0sIFsnU2FjdXRlJywgWzM0Nl1dLCBbJ3NhY3V0ZScsIFszNDddXSwgWydzYnF1bycsIFs4MjE4XV0sIFsnc2NhcCcsIFsxMDkzNl1dLCBbJ1NjYXJvbicsIFszNTJdXSwgWydzY2Fyb24nLCBbMzUzXV0sIFsnU2MnLCBbMTA5NDBdXSwgWydzYycsIFs4ODI3XV0sIFsnc2NjdWUnLCBbODgyOV1dLCBbJ3NjZScsIFsxMDkyOF1dLCBbJ3NjRScsIFsxMDkzMl1dLCBbJ1NjZWRpbCcsIFszNTBdXSwgWydzY2VkaWwnLCBbMzUxXV0sIFsnU2NpcmMnLCBbMzQ4XV0sIFsnc2NpcmMnLCBbMzQ5XV0sIFsnc2NuYXAnLCBbMTA5MzhdXSwgWydzY25FJywgWzEwOTM0XV0sIFsnc2Nuc2ltJywgWzg5MzddXSwgWydzY3BvbGludCcsIFsxMDc3MV1dLCBbJ3Njc2ltJywgWzg4MzFdXSwgWydTY3knLCBbMTA1N11dLCBbJ3NjeScsIFsxMDg5XV0sIFsnc2RvdGInLCBbODg2NV1dLCBbJ3Nkb3QnLCBbODkwMV1dLCBbJ3Nkb3RlJywgWzEwODU0XV0sIFsnc2VhcmhrJywgWzEwNTMzXV0sIFsnc2VhcnInLCBbODYwMF1dLCBbJ3NlQXJyJywgWzg2NjRdXSwgWydzZWFycm93JywgWzg2MDBdXSwgWydzZWN0JywgWzE2N11dLCBbJ3NlbWknLCBbNTldXSwgWydzZXN3YXInLCBbMTA1MzddXSwgWydzZXRtaW51cycsIFs4NzI2XV0sIFsnc2V0bW4nLCBbODcyNl1dLCBbJ3NleHQnLCBbMTAwMzhdXSwgWydTZnInLCBbMTIwMDg2XV0sIFsnc2ZyJywgWzEyMDExMl1dLCBbJ3Nmcm93bicsIFs4OTk0XV0sIFsnc2hhcnAnLCBbOTgzOV1dLCBbJ1NIQ0hjeScsIFsxMDY1XV0sIFsnc2hjaGN5JywgWzEwOTddXSwgWydTSGN5JywgWzEwNjRdXSwgWydzaGN5JywgWzEwOTZdXSwgWydTaG9ydERvd25BcnJvdycsIFs4NTk1XV0sIFsnU2hvcnRMZWZ0QXJyb3cnLCBbODU5Ml1dLCBbJ3Nob3J0bWlkJywgWzg3MzldXSwgWydzaG9ydHBhcmFsbGVsJywgWzg3NDFdXSwgWydTaG9ydFJpZ2h0QXJyb3cnLCBbODU5NF1dLCBbJ1Nob3J0VXBBcnJvdycsIFs4NTkzXV0sIFsnc2h5JywgWzE3M11dLCBbJ1NpZ21hJywgWzkzMV1dLCBbJ3NpZ21hJywgWzk2M11dLCBbJ3NpZ21hZicsIFs5NjJdXSwgWydzaWdtYXYnLCBbOTYyXV0sIFsnc2ltJywgWzg3NjRdXSwgWydzaW1kb3QnLCBbMTA4NThdXSwgWydzaW1lJywgWzg3NzFdXSwgWydzaW1lcScsIFs4NzcxXV0sIFsnc2ltZycsIFsxMDkxMF1dLCBbJ3NpbWdFJywgWzEwOTEyXV0sIFsnc2ltbCcsIFsxMDkwOV1dLCBbJ3NpbWxFJywgWzEwOTExXV0sIFsnc2ltbmUnLCBbODc3NF1dLCBbJ3NpbXBsdXMnLCBbMTA3ODhdXSwgWydzaW1yYXJyJywgWzEwNjEwXV0sIFsnc2xhcnInLCBbODU5Ml1dLCBbJ1NtYWxsQ2lyY2xlJywgWzg3MjhdXSwgWydzbWFsbHNldG1pbnVzJywgWzg3MjZdXSwgWydzbWFzaHAnLCBbMTA4MDNdXSwgWydzbWVwYXJzbCcsIFsxMDcyNF1dLCBbJ3NtaWQnLCBbODczOV1dLCBbJ3NtaWxlJywgWzg5OTVdXSwgWydzbXQnLCBbMTA5MjJdXSwgWydzbXRlJywgWzEwOTI0XV0sIFsnc210ZXMnLCBbMTA5MjQsIDY1MDI0XV0sIFsnU09GVGN5JywgWzEwNjhdXSwgWydzb2Z0Y3knLCBbMTEwMF1dLCBbJ3NvbGJhcicsIFs5MDIzXV0sIFsnc29sYicsIFsxMDY5Ml1dLCBbJ3NvbCcsIFs0N11dLCBbJ1NvcGYnLCBbMTIwMTM4XV0sIFsnc29wZicsIFsxMjAxNjRdXSwgWydzcGFkZXMnLCBbOTgyNF1dLCBbJ3NwYWRlc3VpdCcsIFs5ODI0XV0sIFsnc3BhcicsIFs4NzQxXV0sIFsnc3FjYXAnLCBbODg1MV1dLCBbJ3NxY2FwcycsIFs4ODUxLCA2NTAyNF1dLCBbJ3NxY3VwJywgWzg4NTJdXSwgWydzcWN1cHMnLCBbODg1MiwgNjUwMjRdXSwgWydTcXJ0JywgWzg3MzBdXSwgWydzcXN1YicsIFs4ODQ3XV0sIFsnc3FzdWJlJywgWzg4NDldXSwgWydzcXN1YnNldCcsIFs4ODQ3XV0sIFsnc3FzdWJzZXRlcScsIFs4ODQ5XV0sIFsnc3FzdXAnLCBbODg0OF1dLCBbJ3Nxc3VwZScsIFs4ODUwXV0sIFsnc3FzdXBzZXQnLCBbODg0OF1dLCBbJ3Nxc3Vwc2V0ZXEnLCBbODg1MF1dLCBbJ3NxdWFyZScsIFs5NjMzXV0sIFsnU3F1YXJlJywgWzk2MzNdXSwgWydTcXVhcmVJbnRlcnNlY3Rpb24nLCBbODg1MV1dLCBbJ1NxdWFyZVN1YnNldCcsIFs4ODQ3XV0sIFsnU3F1YXJlU3Vic2V0RXF1YWwnLCBbODg0OV1dLCBbJ1NxdWFyZVN1cGVyc2V0JywgWzg4NDhdXSwgWydTcXVhcmVTdXBlcnNldEVxdWFsJywgWzg4NTBdXSwgWydTcXVhcmVVbmlvbicsIFs4ODUyXV0sIFsnc3F1YXJmJywgWzk2NDJdXSwgWydzcXUnLCBbOTYzM11dLCBbJ3NxdWYnLCBbOTY0Ml1dLCBbJ3NyYXJyJywgWzg1OTRdXSwgWydTc2NyJywgWzExOTk4Ml1dLCBbJ3NzY3InLCBbMTIwMDA4XV0sIFsnc3NldG1uJywgWzg3MjZdXSwgWydzc21pbGUnLCBbODk5NV1dLCBbJ3NzdGFyZicsIFs4OTAyXV0sIFsnU3RhcicsIFs4OTAyXV0sIFsnc3RhcicsIFs5NzM0XV0sIFsnc3RhcmYnLCBbOTczM11dLCBbJ3N0cmFpZ2h0ZXBzaWxvbicsIFsxMDEzXV0sIFsnc3RyYWlnaHRwaGknLCBbOTgxXV0sIFsnc3RybnMnLCBbMTc1XV0sIFsnc3ViJywgWzg4MzRdXSwgWydTdWInLCBbODkxMl1dLCBbJ3N1YmRvdCcsIFsxMDk0MV1dLCBbJ3N1YkUnLCBbMTA5NDldXSwgWydzdWJlJywgWzg4MzhdXSwgWydzdWJlZG90JywgWzEwOTQ3XV0sIFsnc3VibXVsdCcsIFsxMDk0NV1dLCBbJ3N1Ym5FJywgWzEwOTU1XV0sIFsnc3VibmUnLCBbODg0Ml1dLCBbJ3N1YnBsdXMnLCBbMTA5NDNdXSwgWydzdWJyYXJyJywgWzEwNjE3XV0sIFsnc3Vic2V0JywgWzg4MzRdXSwgWydTdWJzZXQnLCBbODkxMl1dLCBbJ3N1YnNldGVxJywgWzg4MzhdXSwgWydzdWJzZXRlcXEnLCBbMTA5NDldXSwgWydTdWJzZXRFcXVhbCcsIFs4ODM4XV0sIFsnc3Vic2V0bmVxJywgWzg4NDJdXSwgWydzdWJzZXRuZXFxJywgWzEwOTU1XV0sIFsnc3Vic2ltJywgWzEwOTUxXV0sIFsnc3Vic3ViJywgWzEwOTY1XV0sIFsnc3Vic3VwJywgWzEwOTYzXV0sIFsnc3VjY2FwcHJveCcsIFsxMDkzNl1dLCBbJ3N1Y2MnLCBbODgyN11dLCBbJ3N1Y2NjdXJseWVxJywgWzg4MjldXSwgWydTdWNjZWVkcycsIFs4ODI3XV0sIFsnU3VjY2VlZHNFcXVhbCcsIFsxMDkyOF1dLCBbJ1N1Y2NlZWRzU2xhbnRFcXVhbCcsIFs4ODI5XV0sIFsnU3VjY2VlZHNUaWxkZScsIFs4ODMxXV0sIFsnc3VjY2VxJywgWzEwOTI4XV0sIFsnc3VjY25hcHByb3gnLCBbMTA5MzhdXSwgWydzdWNjbmVxcScsIFsxMDkzNF1dLCBbJ3N1Y2Nuc2ltJywgWzg5MzddXSwgWydzdWNjc2ltJywgWzg4MzFdXSwgWydTdWNoVGhhdCcsIFs4NzE1XV0sIFsnc3VtJywgWzg3MjFdXSwgWydTdW0nLCBbODcyMV1dLCBbJ3N1bmcnLCBbOTgzNF1dLCBbJ3N1cDEnLCBbMTg1XV0sIFsnc3VwMicsIFsxNzhdXSwgWydzdXAzJywgWzE3OV1dLCBbJ3N1cCcsIFs4ODM1XV0sIFsnU3VwJywgWzg5MTNdXSwgWydzdXBkb3QnLCBbMTA5NDJdXSwgWydzdXBkc3ViJywgWzEwOTY4XV0sIFsnc3VwRScsIFsxMDk1MF1dLCBbJ3N1cGUnLCBbODgzOV1dLCBbJ3N1cGVkb3QnLCBbMTA5NDhdXSwgWydTdXBlcnNldCcsIFs4ODM1XV0sIFsnU3VwZXJzZXRFcXVhbCcsIFs4ODM5XV0sIFsnc3VwaHNvbCcsIFsxMDE4NV1dLCBbJ3N1cGhzdWInLCBbMTA5NjddXSwgWydzdXBsYXJyJywgWzEwNjE5XV0sIFsnc3VwbXVsdCcsIFsxMDk0Nl1dLCBbJ3N1cG5FJywgWzEwOTU2XV0sIFsnc3VwbmUnLCBbODg0M11dLCBbJ3N1cHBsdXMnLCBbMTA5NDRdXSwgWydzdXBzZXQnLCBbODgzNV1dLCBbJ1N1cHNldCcsIFs4OTEzXV0sIFsnc3Vwc2V0ZXEnLCBbODgzOV1dLCBbJ3N1cHNldGVxcScsIFsxMDk1MF1dLCBbJ3N1cHNldG5lcScsIFs4ODQzXV0sIFsnc3Vwc2V0bmVxcScsIFsxMDk1Nl1dLCBbJ3N1cHNpbScsIFsxMDk1Ml1dLCBbJ3N1cHN1YicsIFsxMDk2NF1dLCBbJ3N1cHN1cCcsIFsxMDk2Nl1dLCBbJ3N3YXJoaycsIFsxMDUzNF1dLCBbJ3N3YXJyJywgWzg2MDFdXSwgWydzd0FycicsIFs4NjY1XV0sIFsnc3dhcnJvdycsIFs4NjAxXV0sIFsnc3dud2FyJywgWzEwNTM4XV0sIFsnc3psaWcnLCBbMjIzXV0sIFsnVGFiJywgWzldXSwgWyd0YXJnZXQnLCBbODk4Ml1dLCBbJ1RhdScsIFs5MzJdXSwgWyd0YXUnLCBbOTY0XV0sIFsndGJyaycsIFs5MTQwXV0sIFsnVGNhcm9uJywgWzM1Nl1dLCBbJ3RjYXJvbicsIFszNTddXSwgWydUY2VkaWwnLCBbMzU0XV0sIFsndGNlZGlsJywgWzM1NV1dLCBbJ1RjeScsIFsxMDU4XV0sIFsndGN5JywgWzEwOTBdXSwgWyd0ZG90JywgWzg0MTFdXSwgWyd0ZWxyZWMnLCBbODk4MV1dLCBbJ1RmcicsIFsxMjAwODddXSwgWyd0ZnInLCBbMTIwMTEzXV0sIFsndGhlcmU0JywgWzg3NTZdXSwgWyd0aGVyZWZvcmUnLCBbODc1Nl1dLCBbJ1RoZXJlZm9yZScsIFs4NzU2XV0sIFsnVGhldGEnLCBbOTIwXV0sIFsndGhldGEnLCBbOTUyXV0sIFsndGhldGFzeW0nLCBbOTc3XV0sIFsndGhldGF2JywgWzk3N11dLCBbJ3RoaWNrYXBwcm94JywgWzg3NzZdXSwgWyd0aGlja3NpbScsIFs4NzY0XV0sIFsnVGhpY2tTcGFjZScsIFs4Mjg3LCA4MjAyXV0sIFsnVGhpblNwYWNlJywgWzgyMDFdXSwgWyd0aGluc3AnLCBbODIwMV1dLCBbJ3Roa2FwJywgWzg3NzZdXSwgWyd0aGtzaW0nLCBbODc2NF1dLCBbJ1RIT1JOJywgWzIyMl1dLCBbJ3Rob3JuJywgWzI1NF1dLCBbJ3RpbGRlJywgWzczMl1dLCBbJ1RpbGRlJywgWzg3NjRdXSwgWydUaWxkZUVxdWFsJywgWzg3NzFdXSwgWydUaWxkZUZ1bGxFcXVhbCcsIFs4NzczXV0sIFsnVGlsZGVUaWxkZScsIFs4Nzc2XV0sIFsndGltZXNiYXInLCBbMTA4MDFdXSwgWyd0aW1lc2InLCBbODg2NF1dLCBbJ3RpbWVzJywgWzIxNV1dLCBbJ3RpbWVzZCcsIFsxMDgwMF1dLCBbJ3RpbnQnLCBbODc0OV1dLCBbJ3RvZWEnLCBbMTA1MzZdXSwgWyd0b3Bib3QnLCBbOTAxNF1dLCBbJ3RvcGNpcicsIFsxMDk5M11dLCBbJ3RvcCcsIFs4ODY4XV0sIFsnVG9wZicsIFsxMjAxMzldXSwgWyd0b3BmJywgWzEyMDE2NV1dLCBbJ3RvcGZvcmsnLCBbMTA5NzBdXSwgWyd0b3NhJywgWzEwNTM3XV0sIFsndHByaW1lJywgWzgyNDRdXSwgWyd0cmFkZScsIFs4NDgyXV0sIFsnVFJBREUnLCBbODQ4Ml1dLCBbJ3RyaWFuZ2xlJywgWzk2NTNdXSwgWyd0cmlhbmdsZWRvd24nLCBbOTY2M11dLCBbJ3RyaWFuZ2xlbGVmdCcsIFs5NjY3XV0sIFsndHJpYW5nbGVsZWZ0ZXEnLCBbODg4NF1dLCBbJ3RyaWFuZ2xlcScsIFs4Nzk2XV0sIFsndHJpYW5nbGVyaWdodCcsIFs5NjU3XV0sIFsndHJpYW5nbGVyaWdodGVxJywgWzg4ODVdXSwgWyd0cmlkb3QnLCBbOTcwOF1dLCBbJ3RyaWUnLCBbODc5Nl1dLCBbJ3RyaW1pbnVzJywgWzEwODEwXV0sIFsnVHJpcGxlRG90JywgWzg0MTFdXSwgWyd0cmlwbHVzJywgWzEwODA5XV0sIFsndHJpc2InLCBbMTA3MDFdXSwgWyd0cml0aW1lJywgWzEwODExXV0sIFsndHJwZXppdW0nLCBbOTE4Nl1dLCBbJ1RzY3InLCBbMTE5OTgzXV0sIFsndHNjcicsIFsxMjAwMDldXSwgWydUU2N5JywgWzEwNjJdXSwgWyd0c2N5JywgWzEwOTRdXSwgWydUU0hjeScsIFsxMDM1XV0sIFsndHNoY3knLCBbMTExNV1dLCBbJ1RzdHJvaycsIFszNThdXSwgWyd0c3Ryb2snLCBbMzU5XV0sIFsndHdpeHQnLCBbODgxMl1dLCBbJ3R3b2hlYWRsZWZ0YXJyb3cnLCBbODYwNl1dLCBbJ3R3b2hlYWRyaWdodGFycm93JywgWzg2MDhdXSwgWydVYWN1dGUnLCBbMjE4XV0sIFsndWFjdXRlJywgWzI1MF1dLCBbJ3VhcnInLCBbODU5M11dLCBbJ1VhcnInLCBbODYwN11dLCBbJ3VBcnInLCBbODY1N11dLCBbJ1VhcnJvY2lyJywgWzEwNTY5XV0sIFsnVWJyY3knLCBbMTAzOF1dLCBbJ3VicmN5JywgWzExMThdXSwgWydVYnJldmUnLCBbMzY0XV0sIFsndWJyZXZlJywgWzM2NV1dLCBbJ1VjaXJjJywgWzIxOV1dLCBbJ3VjaXJjJywgWzI1MV1dLCBbJ1VjeScsIFsxMDU5XV0sIFsndWN5JywgWzEwOTFdXSwgWyd1ZGFycicsIFs4NjQ1XV0sIFsnVWRibGFjJywgWzM2OF1dLCBbJ3VkYmxhYycsIFszNjldXSwgWyd1ZGhhcicsIFsxMDYwNl1dLCBbJ3VmaXNodCcsIFsxMDYyMl1dLCBbJ1VmcicsIFsxMjAwODhdXSwgWyd1ZnInLCBbMTIwMTE0XV0sIFsnVWdyYXZlJywgWzIxN11dLCBbJ3VncmF2ZScsIFsyNDldXSwgWyd1SGFyJywgWzEwNTk1XV0sIFsndWhhcmwnLCBbODYzOV1dLCBbJ3VoYXJyJywgWzg2MzhdXSwgWyd1aGJsaycsIFs5NjAwXV0sIFsndWxjb3JuJywgWzg5ODhdXSwgWyd1bGNvcm5lcicsIFs4OTg4XV0sIFsndWxjcm9wJywgWzg5NzVdXSwgWyd1bHRyaScsIFs5NzIwXV0sIFsnVW1hY3InLCBbMzYyXV0sIFsndW1hY3InLCBbMzYzXV0sIFsndW1sJywgWzE2OF1dLCBbJ1VuZGVyQmFyJywgWzk1XV0sIFsnVW5kZXJCcmFjZScsIFs5MTgzXV0sIFsnVW5kZXJCcmFja2V0JywgWzkxNDFdXSwgWydVbmRlclBhcmVudGhlc2lzJywgWzkxODFdXSwgWydVbmlvbicsIFs4ODk5XV0sIFsnVW5pb25QbHVzJywgWzg4NDZdXSwgWydVb2dvbicsIFszNzBdXSwgWyd1b2dvbicsIFszNzFdXSwgWydVb3BmJywgWzEyMDE0MF1dLCBbJ3VvcGYnLCBbMTIwMTY2XV0sIFsnVXBBcnJvd0JhcicsIFsxMDUxNF1dLCBbJ3VwYXJyb3cnLCBbODU5M11dLCBbJ1VwQXJyb3cnLCBbODU5M11dLCBbJ1VwYXJyb3cnLCBbODY1N11dLCBbJ1VwQXJyb3dEb3duQXJyb3cnLCBbODY0NV1dLCBbJ3VwZG93bmFycm93JywgWzg1OTddXSwgWydVcERvd25BcnJvdycsIFs4NTk3XV0sIFsnVXBkb3duYXJyb3cnLCBbODY2MV1dLCBbJ1VwRXF1aWxpYnJpdW0nLCBbMTA2MDZdXSwgWyd1cGhhcnBvb25sZWZ0JywgWzg2MzldXSwgWyd1cGhhcnBvb25yaWdodCcsIFs4NjM4XV0sIFsndXBsdXMnLCBbODg0Nl1dLCBbJ1VwcGVyTGVmdEFycm93JywgWzg1OThdXSwgWydVcHBlclJpZ2h0QXJyb3cnLCBbODU5OV1dLCBbJ3Vwc2knLCBbOTY1XV0sIFsnVXBzaScsIFs5NzhdXSwgWyd1cHNpaCcsIFs5NzhdXSwgWydVcHNpbG9uJywgWzkzM11dLCBbJ3Vwc2lsb24nLCBbOTY1XV0sIFsnVXBUZWVBcnJvdycsIFs4NjEzXV0sIFsnVXBUZWUnLCBbODg2OV1dLCBbJ3VwdXBhcnJvd3MnLCBbODY0OF1dLCBbJ3VyY29ybicsIFs4OTg5XV0sIFsndXJjb3JuZXInLCBbODk4OV1dLCBbJ3VyY3JvcCcsIFs4OTc0XV0sIFsnVXJpbmcnLCBbMzY2XV0sIFsndXJpbmcnLCBbMzY3XV0sIFsndXJ0cmknLCBbOTcyMV1dLCBbJ1VzY3InLCBbMTE5OTg0XV0sIFsndXNjcicsIFsxMjAwMTBdXSwgWyd1dGRvdCcsIFs4OTQ0XV0sIFsnVXRpbGRlJywgWzM2MF1dLCBbJ3V0aWxkZScsIFszNjFdXSwgWyd1dHJpJywgWzk2NTNdXSwgWyd1dHJpZicsIFs5NjUyXV0sIFsndXVhcnInLCBbODY0OF1dLCBbJ1V1bWwnLCBbMjIwXV0sIFsndXVtbCcsIFsyNTJdXSwgWyd1d2FuZ2xlJywgWzEwNjYzXV0sIFsndmFuZ3J0JywgWzEwNjUyXV0sIFsndmFyZXBzaWxvbicsIFsxMDEzXV0sIFsndmFya2FwcGEnLCBbMTAwOF1dLCBbJ3Zhcm5vdGhpbmcnLCBbODcwOV1dLCBbJ3ZhcnBoaScsIFs5ODFdXSwgWyd2YXJwaScsIFs5ODJdXSwgWyd2YXJwcm9wdG8nLCBbODczM11dLCBbJ3ZhcnInLCBbODU5N11dLCBbJ3ZBcnInLCBbODY2MV1dLCBbJ3ZhcnJobycsIFsxMDA5XV0sIFsndmFyc2lnbWEnLCBbOTYyXV0sIFsndmFyc3Vic2V0bmVxJywgWzg4NDIsIDY1MDI0XV0sIFsndmFyc3Vic2V0bmVxcScsIFsxMDk1NSwgNjUwMjRdXSwgWyd2YXJzdXBzZXRuZXEnLCBbODg0MywgNjUwMjRdXSwgWyd2YXJzdXBzZXRuZXFxJywgWzEwOTU2LCA2NTAyNF1dLCBbJ3ZhcnRoZXRhJywgWzk3N11dLCBbJ3ZhcnRyaWFuZ2xlbGVmdCcsIFs4ODgyXV0sIFsndmFydHJpYW5nbGVyaWdodCcsIFs4ODgzXV0sIFsndkJhcicsIFsxMDk4NF1dLCBbJ1ZiYXInLCBbMTA5ODddXSwgWyd2QmFydicsIFsxMDk4NV1dLCBbJ1ZjeScsIFsxMDQyXV0sIFsndmN5JywgWzEwNzRdXSwgWyd2ZGFzaCcsIFs4ODY2XV0sIFsndkRhc2gnLCBbODg3Ml1dLCBbJ1ZkYXNoJywgWzg4NzNdXSwgWydWRGFzaCcsIFs4ODc1XV0sIFsnVmRhc2hsJywgWzEwOTgyXV0sIFsndmVlYmFyJywgWzg4OTFdXSwgWyd2ZWUnLCBbODc0NF1dLCBbJ1ZlZScsIFs4ODk3XV0sIFsndmVlZXEnLCBbODc5NF1dLCBbJ3ZlbGxpcCcsIFs4OTQyXV0sIFsndmVyYmFyJywgWzEyNF1dLCBbJ1ZlcmJhcicsIFs4MjE0XV0sIFsndmVydCcsIFsxMjRdXSwgWydWZXJ0JywgWzgyMTRdXSwgWydWZXJ0aWNhbEJhcicsIFs4NzM5XV0sIFsnVmVydGljYWxMaW5lJywgWzEyNF1dLCBbJ1ZlcnRpY2FsU2VwYXJhdG9yJywgWzEwMDcyXV0sIFsnVmVydGljYWxUaWxkZScsIFs4NzY4XV0sIFsnVmVyeVRoaW5TcGFjZScsIFs4MjAyXV0sIFsnVmZyJywgWzEyMDA4OV1dLCBbJ3ZmcicsIFsxMjAxMTVdXSwgWyd2bHRyaScsIFs4ODgyXV0sIFsndm5zdWInLCBbODgzNCwgODQwMl1dLCBbJ3Zuc3VwJywgWzg4MzUsIDg0MDJdXSwgWydWb3BmJywgWzEyMDE0MV1dLCBbJ3ZvcGYnLCBbMTIwMTY3XV0sIFsndnByb3AnLCBbODczM11dLCBbJ3ZydHJpJywgWzg4ODNdXSwgWydWc2NyJywgWzExOTk4NV1dLCBbJ3ZzY3InLCBbMTIwMDExXV0sIFsndnN1Ym5FJywgWzEwOTU1LCA2NTAyNF1dLCBbJ3ZzdWJuZScsIFs4ODQyLCA2NTAyNF1dLCBbJ3ZzdXBuRScsIFsxMDk1NiwgNjUwMjRdXSwgWyd2c3VwbmUnLCBbODg0MywgNjUwMjRdXSwgWydWdmRhc2gnLCBbODg3NF1dLCBbJ3Z6aWd6YWcnLCBbMTA2NTBdXSwgWydXY2lyYycsIFszNzJdXSwgWyd3Y2lyYycsIFszNzNdXSwgWyd3ZWRiYXInLCBbMTA4NDddXSwgWyd3ZWRnZScsIFs4NzQzXV0sIFsnV2VkZ2UnLCBbODg5Nl1dLCBbJ3dlZGdlcScsIFs4NzkzXV0sIFsnd2VpZXJwJywgWzg0NzJdXSwgWydXZnInLCBbMTIwMDkwXV0sIFsnd2ZyJywgWzEyMDExNl1dLCBbJ1dvcGYnLCBbMTIwMTQyXV0sIFsnd29wZicsIFsxMjAxNjhdXSwgWyd3cCcsIFs4NDcyXV0sIFsnd3InLCBbODc2OF1dLCBbJ3dyZWF0aCcsIFs4NzY4XV0sIFsnV3NjcicsIFsxMTk5ODZdXSwgWyd3c2NyJywgWzEyMDAxMl1dLCBbJ3hjYXAnLCBbODg5OF1dLCBbJ3hjaXJjJywgWzk3MTFdXSwgWyd4Y3VwJywgWzg4OTldXSwgWyd4ZHRyaScsIFs5NjYxXV0sIFsnWGZyJywgWzEyMDA5MV1dLCBbJ3hmcicsIFsxMjAxMTddXSwgWyd4aGFycicsIFsxMDIzMV1dLCBbJ3hoQXJyJywgWzEwMjM0XV0sIFsnWGknLCBbOTI2XV0sIFsneGknLCBbOTU4XV0sIFsneGxhcnInLCBbMTAyMjldXSwgWyd4bEFycicsIFsxMDIzMl1dLCBbJ3htYXAnLCBbMTAyMzZdXSwgWyd4bmlzJywgWzg5NTVdXSwgWyd4b2RvdCcsIFsxMDc1Ml1dLCBbJ1hvcGYnLCBbMTIwMTQzXV0sIFsneG9wZicsIFsxMjAxNjldXSwgWyd4b3BsdXMnLCBbMTA3NTNdXSwgWyd4b3RpbWUnLCBbMTA3NTRdXSwgWyd4cmFycicsIFsxMDIzMF1dLCBbJ3hyQXJyJywgWzEwMjMzXV0sIFsnWHNjcicsIFsxMTk5ODddXSwgWyd4c2NyJywgWzEyMDAxM11dLCBbJ3hzcWN1cCcsIFsxMDc1OF1dLCBbJ3h1cGx1cycsIFsxMDc1Nl1dLCBbJ3h1dHJpJywgWzk2NTFdXSwgWyd4dmVlJywgWzg4OTddXSwgWyd4d2VkZ2UnLCBbODg5Nl1dLCBbJ1lhY3V0ZScsIFsyMjFdXSwgWyd5YWN1dGUnLCBbMjUzXV0sIFsnWUFjeScsIFsxMDcxXV0sIFsneWFjeScsIFsxMTAzXV0sIFsnWWNpcmMnLCBbMzc0XV0sIFsneWNpcmMnLCBbMzc1XV0sIFsnWWN5JywgWzEwNjddXSwgWyd5Y3knLCBbMTA5OV1dLCBbJ3llbicsIFsxNjVdXSwgWydZZnInLCBbMTIwMDkyXV0sIFsneWZyJywgWzEyMDExOF1dLCBbJ1lJY3knLCBbMTAzMV1dLCBbJ3lpY3knLCBbMTExMV1dLCBbJ1lvcGYnLCBbMTIwMTQ0XV0sIFsneW9wZicsIFsxMjAxNzBdXSwgWydZc2NyJywgWzExOTk4OF1dLCBbJ3lzY3InLCBbMTIwMDE0XV0sIFsnWVVjeScsIFsxMDcwXV0sIFsneXVjeScsIFsxMTAyXV0sIFsneXVtbCcsIFsyNTVdXSwgWydZdW1sJywgWzM3Nl1dLCBbJ1phY3V0ZScsIFszNzddXSwgWyd6YWN1dGUnLCBbMzc4XV0sIFsnWmNhcm9uJywgWzM4MV1dLCBbJ3pjYXJvbicsIFszODJdXSwgWydaY3knLCBbMTA0N11dLCBbJ3pjeScsIFsxMDc5XV0sIFsnWmRvdCcsIFszNzldXSwgWyd6ZG90JywgWzM4MF1dLCBbJ3plZXRyZicsIFs4NDg4XV0sIFsnWmVyb1dpZHRoU3BhY2UnLCBbODIwM11dLCBbJ1pldGEnLCBbOTE4XV0sIFsnemV0YScsIFs5NTBdXSwgWyd6ZnInLCBbMTIwMTE5XV0sIFsnWmZyJywgWzg0ODhdXSwgWydaSGN5JywgWzEwNDZdXSwgWyd6aGN5JywgWzEwNzhdXSwgWyd6aWdyYXJyJywgWzg2NjldXSwgWyd6b3BmJywgWzEyMDE3MV1dLCBbJ1pvcGYnLCBbODQ4NF1dLCBbJ1pzY3InLCBbMTE5OTg5XV0sIFsnenNjcicsIFsxMjAwMTVdXSwgWyd6d2onLCBbODIwNV1dLCBbJ3p3bmonLCBbODIwNF1dXTtcclxuXHJcbnZhciBhbHBoYUluZGV4ID0ge307XHJcbnZhciBjaGFySW5kZXggPSB7fTtcclxuXHJcbmNyZWF0ZUluZGV4ZXMoYWxwaGFJbmRleCwgY2hhckluZGV4KTtcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIEh0bWw1RW50aXRpZXMoKSB7fVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbkh0bWw1RW50aXRpZXMucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYoIz9bXFx3XFxkXSspOz8vZywgZnVuY3Rpb24ocywgZW50aXR5KSB7XHJcbiAgICAgICAgdmFyIGNocjtcclxuICAgICAgICBpZiAoZW50aXR5LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgdmFyIGNvZGUgPSBlbnRpdHkuY2hhckF0KDEpID09PSAneCcgP1xyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCAxNikgOlxyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoZW50aXR5LnN1YnN0cigxKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIShpc05hTihjb2RlKSB8fCBjb2RlIDwgLTMyNzY4IHx8IGNvZGUgPiA2NTUzNSkpIHtcclxuICAgICAgICAgICAgICAgIGNociA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaHIgPSBhbHBoYUluZGV4W2VudGl0eV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaHIgfHwgcztcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbiBIdG1sNUVudGl0aWVzLmRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZGVjb2RlKHN0cik7XHJcbiB9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbkh0bWw1RW50aXRpZXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHZhciBpID0gMDtcclxuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJJbmZvID0gY2hhckluZGV4W3N0ci5jaGFyQ29kZUF0KGkpXTtcclxuICAgICAgICBpZiAoY2hhckluZm8pIHtcclxuICAgICAgICAgICAgdmFyIGFscGhhID0gY2hhckluZm9bc3RyLmNoYXJDb2RlQXQoaSArIDEpXTtcclxuICAgICAgICAgICAgaWYgKGFscGhhKSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbHBoYSA9IGNoYXJJbmZvWycnXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxwaGEpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIiZcIiArIGFscGhhICsgXCI7XCI7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbiBIdG1sNUVudGl0aWVzLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlKHN0cik7XHJcbiB9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbkh0bWw1RW50aXRpZXMucHJvdG90eXBlLmVuY29kZU5vblVURiA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHZhciBpID0gMDtcclxuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICB2YXIgY2hhckluZm8gPSBjaGFySW5kZXhbY107XHJcbiAgICAgICAgaWYgKGNoYXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IGNoYXJJbmZvW3N0ci5jaGFyQ29kZUF0KGkgKyAxKV07XHJcbiAgICAgICAgICAgIGlmIChhbHBoYSkge1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxwaGEgPSBjaGFySW5mb1snJ107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFscGhhKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCImXCIgKyBhbHBoYSArIFwiO1wiO1xyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGMgPCAzMiB8fCBjID4gMTI2KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG4gSHRtbDVFbnRpdGllcy5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIHJldHVybiBuZXcgSHRtbDVFbnRpdGllcygpLmVuY29kZU5vblVURihzdHIpO1xyXG4gfTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG5IdG1sNUVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHZhciBpID0gMDtcclxuICAgIHdoaWxlIChpIDwgc3RyTGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHN0cltpKytdO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0ICs9ICcmIycgKyBjICsgJzsnO1xyXG4gICAgICAgIGkrK1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG4gSHRtbDVFbnRpdGllcy5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgcmV0dXJuIG5ldyBIdG1sNUVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcclxuIH07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtPYmplY3R9IGFscGhhSW5kZXggUGFzc2VkIGJ5IHJlZmVyZW5jZS5cclxuICogQHBhcmFtIHtPYmplY3R9IGNoYXJJbmRleCBQYXNzZWQgYnkgcmVmZXJlbmNlLlxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSW5kZXhlcyhhbHBoYUluZGV4LCBjaGFySW5kZXgpIHtcclxuICAgIHZhciBpID0gRU5USVRJRVMubGVuZ3RoO1xyXG4gICAgdmFyIF9yZXN1bHRzID0gW107XHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdmFyIGUgPSBFTlRJVElFU1tpXTtcclxuICAgICAgICB2YXIgYWxwaGEgPSBlWzBdO1xyXG4gICAgICAgIHZhciBjaGFycyA9IGVbMV07XHJcbiAgICAgICAgdmFyIGNociA9IGNoYXJzWzBdO1xyXG4gICAgICAgIHZhciBhZGRDaGFyID0gKGNociA8IDMyIHx8IGNociA+IDEyNikgfHwgY2hyID09PSA2MiB8fCBjaHIgPT09IDYwIHx8IGNociA9PT0gMzggfHwgY2hyID09PSAzNCB8fCBjaHIgPT09IDM5O1xyXG4gICAgICAgIHZhciBjaGFySW5mbztcclxuICAgICAgICBpZiAoYWRkQ2hhcikge1xyXG4gICAgICAgICAgICBjaGFySW5mbyA9IGNoYXJJbmRleFtjaHJdID0gY2hhckluZGV4W2Nocl0gfHwge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFyc1sxXSkge1xyXG4gICAgICAgICAgICB2YXIgY2hyMiA9IGNoYXJzWzFdO1xyXG4gICAgICAgICAgICBhbHBoYUluZGV4W2FscGhhXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMik7XHJcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goYWRkQ2hhciAmJiAoY2hhckluZm9bY2hyMl0gPSBhbHBoYSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFscGhhSW5kZXhbYWxwaGFdID0gU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpO1xyXG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGFkZENoYXIgJiYgKGNoYXJJbmZvWycnXSA9IGFscGhhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEh0bWw1RW50aXRpZXM7XHJcbiIsInZhciBBTFBIQV9JTkRFWCA9IHtcclxuICAgICcmbHQnOiAnPCcsXHJcbiAgICAnJmd0JzogJz4nLFxyXG4gICAgJyZxdW90JzogJ1wiJyxcclxuICAgICcmYXBvcyc6ICdcXCcnLFxyXG4gICAgJyZhbXAnOiAnJicsXHJcbiAgICAnJmx0Oyc6ICc8JyxcclxuICAgICcmZ3Q7JzogJz4nLFxyXG4gICAgJyZxdW90Oyc6ICdcIicsXHJcbiAgICAnJmFwb3M7JzogJ1xcJycsXHJcbiAgICAnJmFtcDsnOiAnJidcclxufTtcclxuXHJcbnZhciBDSEFSX0lOREVYID0ge1xyXG4gICAgNjA6ICdsdCcsXHJcbiAgICA2MjogJ2d0JyxcclxuICAgIDM0OiAncXVvdCcsXHJcbiAgICAzOTogJ2Fwb3MnLFxyXG4gICAgMzg6ICdhbXAnXHJcbn07XHJcblxyXG52YXIgQ0hBUl9TX0lOREVYID0ge1xyXG4gICAgJzwnOiAnJmx0OycsXHJcbiAgICAnPic6ICcmZ3Q7JyxcclxuICAgICdcIic6ICcmcXVvdDsnLFxyXG4gICAgJ1xcJyc6ICcmYXBvczsnLFxyXG4gICAgJyYnOiAnJmFtcDsnXHJcbn07XHJcblxyXG4vKipcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBYbWxFbnRpdGllcygpIHt9XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gKi9cclxuWG1sRW50aXRpZXMucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzx8PnxcInwnfCYvZywgZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBDSEFSX1NfSU5ERVhbc107XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG4gWG1sRW50aXRpZXMuZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlKHN0cik7XHJcbiB9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcblhtbEVudGl0aWVzLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIz9bMC05YS16QS1aXSs7Py9nLCBmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgaWYgKHMuY2hhckF0KDEpID09PSAnIycpIHtcclxuICAgICAgICAgICAgdmFyIGNvZGUgPSBzLmNoYXJBdCgyKS50b0xvd2VyQ2FzZSgpID09PSAneCcgP1xyXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQocy5zdWJzdHIoMyksIDE2KSA6XHJcbiAgICAgICAgICAgICAgICBwYXJzZUludChzLnN1YnN0cigyKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNOYU4oY29kZSkgfHwgY29kZSA8IC0zMjc2OCB8fCBjb2RlID4gNjU1MzUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFMUEhBX0lOREVYW3NdIHx8IHM7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG4gWG1sRW50aXRpZXMuZGVjb2RlID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZGVjb2RlKHN0cik7XHJcbiB9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcblhtbEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25VVEYgPSBmdW5jdGlvbihzdHIpIHtcclxuICAgIGlmICghc3RyIHx8ICFzdHIubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgdmFyIHN0ckxlbmd0aCA9IHN0ci5sZW5ndGg7XHJcbiAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICB2YXIgaSA9IDA7XHJcbiAgICB3aGlsZSAoaSA8IHN0ckxlbmd0aCkge1xyXG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgdmFyIGFscGhhID0gQ0hBUl9JTkRFWFtjXTtcclxuICAgICAgICBpZiAoYWxwaGEpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IFwiJlwiICsgYWxwaGEgKyBcIjtcIjtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGMgPCAzMiB8fCBjID4gMTI2KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSAnJiMnICsgYyArICc7JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gc3RyLmNoYXJBdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAqL1xyXG4gWG1sRW50aXRpZXMuZW5jb2RlTm9uVVRGID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlTm9uVVRGKHN0cik7XHJcbiB9O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcblhtbEVudGl0aWVzLnByb3RvdHlwZS5lbmNvZGVOb25BU0NJSSA9IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgaWYgKCFzdHIgfHwgIXN0ci5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyTGVuZ2h0ID0gc3RyLmxlbmd0aDtcclxuICAgIHZhciByZXN1bHQgPSAnJztcclxuICAgIHZhciBpID0gMDtcclxuICAgIHdoaWxlIChpIDwgc3RyTGVuZ2h0KSB7XHJcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICAgICAgICBpZiAoYyA8PSAyNTUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IHN0cltpKytdO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0ICs9ICcmIycgKyBjICsgJzsnO1xyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gKi9cclxuIFhtbEVudGl0aWVzLmVuY29kZU5vbkFTQ0lJID0gZnVuY3Rpb24oc3RyKSB7XHJcbiAgICByZXR1cm4gbmV3IFhtbEVudGl0aWVzKCkuZW5jb2RlTm9uQVNDSUkoc3RyKTtcclxuIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFhtbEVudGl0aWVzO1xyXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cclxuLy9cclxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcclxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxyXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcclxuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxyXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XHJcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxyXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuLy9cclxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcclxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbi8vXHJcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1NcclxuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxyXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXHJcbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxyXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1JcclxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxyXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xyXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cclxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcclxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XHJcbiAgc2VwID0gc2VwIHx8ICcmJztcclxuICBlcSA9IGVxIHx8ICc9JztcclxuICB2YXIgb2JqID0ge307XHJcblxyXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XHJcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xyXG5cclxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XHJcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcclxuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XHJcbiAgfVxyXG5cclxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xyXG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxyXG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XHJcbiAgICBsZW4gPSBtYXhLZXlzO1xyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxyXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXHJcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcclxuXHJcbiAgICBpZiAoaWR4ID49IDApIHtcclxuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XHJcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGtzdHIgPSB4O1xyXG4gICAgICB2c3RyID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcclxuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XHJcblxyXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XHJcbiAgICAgIG9ialtrXSA9IHY7XHJcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xyXG4gICAgICBvYmpba10ucHVzaCh2KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9iajtcclxufTtcclxuXHJcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcclxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxufTtcclxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXHJcbi8vXHJcbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXHJcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcclxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXHJcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcclxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxyXG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcclxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbi8vXHJcbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXHJcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4vL1xyXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXHJcbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxyXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcclxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXHJcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcclxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XHJcbiAgc3dpdGNoICh0eXBlb2Ygdikge1xyXG4gICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgcmV0dXJuIHY7XHJcblxyXG4gICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcclxuXHJcbiAgICBjYXNlICdudW1iZXInOlxyXG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuICcnO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XHJcbiAgc2VwID0gc2VwIHx8ICcmJztcclxuICBlcSA9IGVxIHx8ICc9JztcclxuICBpZiAob2JqID09PSBudWxsKSB7XHJcbiAgICBvYmogPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcclxuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XHJcbiAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XHJcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcclxuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xyXG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XHJcbiAgICAgICAgfSkuam9pbihzZXApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XHJcbiAgICAgIH1cclxuICAgIH0pLmpvaW4oc2VwKTtcclxuXHJcbiAgfVxyXG5cclxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcclxuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXHJcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XHJcbn07XHJcblxyXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XHJcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XHJcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcclxuICB2YXIgcmVzID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcclxuICB2YXIgcmVzID0gW107XHJcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXM7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XHJcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xyXG5cclxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xyXG4gIHZhciBtZW1vO1xyXG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcclxuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcclxuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxyXG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXHJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xyXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcclxuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZW1vO1xyXG4gIH07XHJcbn0oKTtcclxuXHJcbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XHJcbiAgdmFyIG1lbW8gPSB7fTtcclxuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XHJcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxyXG5cclxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxyXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcclxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcclxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XHJcbiAgfTtcclxufSgpO1xyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpIHtcclxuICB2YXIgc3R5bGVzID0gW107XHJcbiAgdmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcclxuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xyXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV07XHJcbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcbiAgICB2YXIgcGFydCA9IHtcclxuICAgICAgY3NzOiBjc3MsXHJcbiAgICAgIG1lZGlhOiBtZWRpYSxcclxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XHJcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7XHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgIHBhcnRzOiBbcGFydF1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuICAgIHZhciBqID0gMDtcclxuXHJcbiAgICBpZiAoZG9tU3R5bGUpIHtcclxuICAgICAgZG9tU3R5bGUucmVmcysrO1xyXG5cclxuICAgICAgZm9yICg7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHBhcnRzID0gW107XHJcblxyXG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7XHJcbiAgICAgICAgaWQ6IGl0ZW0uaWQsXHJcbiAgICAgICAgcmVmczogMSxcclxuICAgICAgICBwYXJ0czogcGFydHNcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHJcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xyXG5cclxuICAgIGlmIChub25jZSkge1xyXG4gICAgICBvcHRpb25zLmF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMuYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBvcHRpb25zLmF0dHJpYnV0ZXNba2V5XSk7XHJcbiAgfSk7XHJcblxyXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xyXG5cclxuICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHlsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XHJcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXHJcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xyXG59XHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xyXG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG4gIH07XHJcbn0oKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcclxuXHJcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xyXG5cclxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xyXG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcclxuXHJcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcclxuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcclxuICB2YXIgY3NzID0gb2JqLmNzcztcclxuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG4gIGlmIChtZWRpYSkge1xyXG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcclxuICB9XHJcblxyXG4gIGlmIChzb3VyY2VNYXAgJiYgYnRvYSkge1xyXG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XHJcbiAgfSAvLyBGb3Igb2xkIElFXHJcblxyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cclxuXHJcblxyXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XHJcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcbiAgfSBlbHNlIHtcclxuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XHJcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIHNpbmdsZXRvbiA9IG51bGw7XHJcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG4gIHZhciBzdHlsZTtcclxuICB2YXIgdXBkYXRlO1xyXG4gIHZhciByZW1vdmU7XHJcblxyXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xyXG5cclxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcclxuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1cGRhdGUob2JqKTtcclxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcbiAgICBpZiAobmV3T2JqKSB7XHJcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIG9wdGlvbnMuYXR0cmlidXRlcyA9IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICdvYmplY3QnID8gb3B0aW9ucy5hdHRyaWJ1dGVzIDoge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHJcbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xyXG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcbiAgfVxyXG5cclxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xyXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcbiAgICB2YXIgbWF5UmVtb3ZlID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cclxuICAgICAgaWYgKGRvbVN0eWxlKSB7XHJcbiAgICAgICAgZG9tU3R5bGUucmVmcy0tO1xyXG4gICAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdMaXN0KSB7XHJcbiAgICAgIHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XHJcbiAgICAgIGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1heVJlbW92ZS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgdmFyIF9kb21TdHlsZSA9IG1heVJlbW92ZVtfaV07XHJcblxyXG4gICAgICBpZiAoX2RvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9kb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgX2RvbVN0eWxlLnBhcnRzW2pdKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bX2RvbVN0eWxlLmlkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn07IiwidmFyIGNhbmRpZGF0ZVNlbGVjdG9ycyA9IFtcclxuICAnaW5wdXQnLFxyXG4gICdzZWxlY3QnLFxyXG4gICd0ZXh0YXJlYScsXHJcbiAgJ2FbaHJlZl0nLFxyXG4gICdidXR0b24nLFxyXG4gICdbdGFiaW5kZXhdJyxcclxuICAnYXVkaW9bY29udHJvbHNdJyxcclxuICAndmlkZW9bY29udHJvbHNdJyxcclxuICAnW2NvbnRlbnRlZGl0YWJsZV06bm90KFtjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiXSknLFxyXG5dO1xyXG52YXIgY2FuZGlkYXRlU2VsZWN0b3IgPSBjYW5kaWRhdGVTZWxlY3RvcnMuam9pbignLCcpO1xyXG5cclxudmFyIG1hdGNoZXMgPSB0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCdcclxuICA/IGZ1bmN0aW9uICgpIHt9XHJcbiAgOiBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuXHJcbmZ1bmN0aW9uIHRhYmJhYmxlKGVsLCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gIHZhciByZWd1bGFyVGFiYmFibGVzID0gW107XHJcbiAgdmFyIG9yZGVyZWRUYWJiYWJsZXMgPSBbXTtcclxuXHJcbiAgdmFyIGNhbmRpZGF0ZXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGNhbmRpZGF0ZVNlbGVjdG9yKTtcclxuXHJcbiAgaWYgKG9wdGlvbnMuaW5jbHVkZUNvbnRhaW5lcikge1xyXG4gICAgaWYgKG1hdGNoZXMuY2FsbChlbCwgY2FuZGlkYXRlU2VsZWN0b3IpKSB7XHJcbiAgICAgIGNhbmRpZGF0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoY2FuZGlkYXRlcyk7XHJcbiAgICAgIGNhbmRpZGF0ZXMudW5zaGlmdChlbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgaSwgY2FuZGlkYXRlLCBjYW5kaWRhdGVUYWJpbmRleDtcclxuICBmb3IgKGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcclxuXHJcbiAgICBpZiAoIWlzTm9kZU1hdGNoaW5nU2VsZWN0b3JUYWJiYWJsZShjYW5kaWRhdGUpKSBjb250aW51ZTtcclxuXHJcbiAgICBjYW5kaWRhdGVUYWJpbmRleCA9IGdldFRhYmluZGV4KGNhbmRpZGF0ZSk7XHJcbiAgICBpZiAoY2FuZGlkYXRlVGFiaW5kZXggPT09IDApIHtcclxuICAgICAgcmVndWxhclRhYmJhYmxlcy5wdXNoKGNhbmRpZGF0ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcmRlcmVkVGFiYmFibGVzLnB1c2goe1xyXG4gICAgICAgIGRvY3VtZW50T3JkZXI6IGksXHJcbiAgICAgICAgdGFiSW5kZXg6IGNhbmRpZGF0ZVRhYmluZGV4LFxyXG4gICAgICAgIG5vZGU6IGNhbmRpZGF0ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgdGFiYmFibGVOb2RlcyA9IG9yZGVyZWRUYWJiYWJsZXNcclxuICAgIC5zb3J0KHNvcnRPcmRlcmVkVGFiYmFibGVzKVxyXG4gICAgLm1hcChmdW5jdGlvbihhKSB7IHJldHVybiBhLm5vZGUgfSlcclxuICAgIC5jb25jYXQocmVndWxhclRhYmJhYmxlcyk7XHJcblxyXG4gIHJldHVybiB0YWJiYWJsZU5vZGVzO1xyXG59XHJcblxyXG50YWJiYWJsZS5pc1RhYmJhYmxlID0gaXNUYWJiYWJsZTtcclxudGFiYmFibGUuaXNGb2N1c2FibGUgPSBpc0ZvY3VzYWJsZTtcclxuXHJcbmZ1bmN0aW9uIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JUYWJiYWJsZShub2RlKSB7XHJcbiAgaWYgKFxyXG4gICAgIWlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUobm9kZSlcclxuICAgIHx8IGlzTm9uVGFiYmFibGVSYWRpbyhub2RlKVxyXG4gICAgfHwgZ2V0VGFiaW5kZXgobm9kZSkgPCAwXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1RhYmJhYmxlKG5vZGUpIHtcclxuICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignTm8gbm9kZSBwcm92aWRlZCcpO1xyXG4gIGlmIChtYXRjaGVzLmNhbGwobm9kZSwgY2FuZGlkYXRlU2VsZWN0b3IpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUobm9kZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUobm9kZSkge1xyXG4gIGlmIChcclxuICAgIG5vZGUuZGlzYWJsZWRcclxuICAgIHx8IGlzSGlkZGVuSW5wdXQobm9kZSlcclxuICAgIHx8IGlzSGlkZGVuKG5vZGUpXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG52YXIgZm9jdXNhYmxlQ2FuZGlkYXRlU2VsZWN0b3IgPSBjYW5kaWRhdGVTZWxlY3RvcnMuY29uY2F0KCdpZnJhbWUnKS5qb2luKCcsJyk7XHJcbmZ1bmN0aW9uIGlzRm9jdXNhYmxlKG5vZGUpIHtcclxuICBpZiAoIW5vZGUpIHRocm93IG5ldyBFcnJvcignTm8gbm9kZSBwcm92aWRlZCcpO1xyXG4gIGlmIChtYXRjaGVzLmNhbGwobm9kZSwgZm9jdXNhYmxlQ2FuZGlkYXRlU2VsZWN0b3IpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yRm9jdXNhYmxlKG5vZGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUYWJpbmRleChub2RlKSB7XHJcbiAgdmFyIHRhYmluZGV4QXR0ciA9IHBhcnNlSW50KG5vZGUuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpLCAxMCk7XHJcbiAgaWYgKCFpc05hTih0YWJpbmRleEF0dHIpKSByZXR1cm4gdGFiaW5kZXhBdHRyO1xyXG4gIC8vIEJyb3dzZXJzIGRvIG5vdCByZXR1cm4gYHRhYkluZGV4YCBjb3JyZWN0bHkgZm9yIGNvbnRlbnRFZGl0YWJsZSBub2RlcztcclxuICAvLyBzbyBpZiB0aGV5IGRvbid0IGhhdmUgYSB0YWJpbmRleCBhdHRyaWJ1dGUgc3BlY2lmaWNhbGx5IHNldCwgYXNzdW1lIGl0J3MgMC5cclxuICBpZiAoaXNDb250ZW50RWRpdGFibGUobm9kZSkpIHJldHVybiAwO1xyXG4gIHJldHVybiBub2RlLnRhYkluZGV4O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzb3J0T3JkZXJlZFRhYmJhYmxlcyhhLCBiKSB7XHJcbiAgcmV0dXJuIGEudGFiSW5kZXggPT09IGIudGFiSW5kZXggPyBhLmRvY3VtZW50T3JkZXIgLSBiLmRvY3VtZW50T3JkZXIgOiBhLnRhYkluZGV4IC0gYi50YWJJbmRleDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNDb250ZW50RWRpdGFibGUobm9kZSkge1xyXG4gIHJldHVybiBub2RlLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0lucHV0KG5vZGUpIHtcclxuICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnSU5QVVQnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0hpZGRlbklucHV0KG5vZGUpIHtcclxuICByZXR1cm4gaXNJbnB1dChub2RlKSAmJiBub2RlLnR5cGUgPT09ICdoaWRkZW4nO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1JhZGlvKG5vZGUpIHtcclxuICByZXR1cm4gaXNJbnB1dChub2RlKSAmJiBub2RlLnR5cGUgPT09ICdyYWRpbyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTm9uVGFiYmFibGVSYWRpbyhub2RlKSB7XHJcbiAgcmV0dXJuIGlzUmFkaW8obm9kZSkgJiYgIWlzVGFiYmFibGVSYWRpbyhub2RlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2hlY2tlZFJhZGlvKG5vZGVzKSB7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKG5vZGVzW2ldLmNoZWNrZWQpIHtcclxuICAgICAgcmV0dXJuIG5vZGVzW2ldO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNUYWJiYWJsZVJhZGlvKG5vZGUpIHtcclxuICBpZiAoIW5vZGUubmFtZSkgcmV0dXJuIHRydWU7XHJcbiAgLy8gVGhpcyB3b24ndCBhY2NvdW50IGZvciB0aGUgZWRnZSBjYXNlIHdoZXJlIHlvdSBoYXZlIHJhZGlvIGdyb3VwcyB3aXRoIHRoZSBzYW1lXHJcbiAgLy8gaW4gc2VwYXJhdGUgZm9ybXMgb24gdGhlIHNhbWUgcGFnZS5cclxuICB2YXIgcmFkaW9TZXQgPSBub2RlLm93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW25hbWU9XCInICsgbm9kZS5uYW1lICsgJ1wiXScpO1xyXG4gIHZhciBjaGVja2VkID0gZ2V0Q2hlY2tlZFJhZGlvKHJhZGlvU2V0KTtcclxuICByZXR1cm4gIWNoZWNrZWQgfHwgY2hlY2tlZCA9PT0gbm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNIaWRkZW4obm9kZSkge1xyXG4gIC8vIG9mZnNldFBhcmVudCBiZWluZyBudWxsIHdpbGwgYWxsb3cgZGV0ZWN0aW5nIGNhc2VzIHdoZXJlIGFuIGVsZW1lbnQgaXMgaW52aXNpYmxlIG9yIGluc2lkZSBhbiBpbnZpc2libGUgZWxlbWVudCxcclxuICAvLyBhcyBsb25nIGFzIHRoZSBlbGVtZW50IGRvZXMgbm90IHVzZSBwb3NpdGlvbjogZml4ZWQuIEZvciB0aGVtLCB0aGVpciB2aXNpYmlsaXR5IGhhcyB0byBiZSBjaGVja2VkIGRpcmVjdGx5IGFzIHdlbGwuXHJcbiAgcmV0dXJuIG5vZGUub2Zmc2V0UGFyZW50ID09PSBudWxsIHx8IGdldENvbXB1dGVkU3R5bGUobm9kZSkudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbic7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGFiYmFibGU7XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8qZXNsaW50LWVudiBicm93c2VyKi9cclxuXHJcbnZhciBjbGllbnRPdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbmNsaWVudE92ZXJsYXkuaWQgPSAnd2VicGFjay1ob3QtbWlkZGxld2FyZS1jbGllbnRPdmVybGF5JztcclxudmFyIHN0eWxlcyA9IHtcclxuICBiYWNrZ3JvdW5kOiAncmdiYSgwLDAsMCwwLjg1KScsXHJcbiAgY29sb3I6ICcjZThlOGU4JyxcclxuICBsaW5lSGVpZ2h0OiAnMS42JyxcclxuICB3aGl0ZVNwYWNlOiAncHJlJyxcclxuICBmb250RmFtaWx5OiAnTWVubG8sIENvbnNvbGFzLCBtb25vc3BhY2UnLFxyXG4gIGZvbnRTaXplOiAnMTNweCcsXHJcbiAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgekluZGV4OiA5OTk5LFxyXG4gIHBhZGRpbmc6ICcxMHB4JyxcclxuICBsZWZ0OiAwLFxyXG4gIHJpZ2h0OiAwLFxyXG4gIHRvcDogMCxcclxuICBib3R0b206IDAsXHJcbiAgb3ZlcmZsb3c6ICdhdXRvJyxcclxuICBkaXI6ICdsdHInLFxyXG4gIHRleHRBbGlnbjogJ2xlZnQnLFxyXG59O1xyXG5cclxudmFyIGFuc2lIVE1MID0gcmVxdWlyZSgnYW5zaS1odG1sJyk7XHJcbnZhciBjb2xvcnMgPSB7XHJcbiAgcmVzZXQ6IFsndHJhbnNwYXJlbnQnLCAndHJhbnNwYXJlbnQnXSxcclxuICBibGFjazogJzE4MTgxOCcsXHJcbiAgcmVkOiAnZmYzMzQ4JyxcclxuICBncmVlbjogJzNmZmY0ZicsXHJcbiAgeWVsbG93OiAnZmZkMzBlJyxcclxuICBibHVlOiAnMTY5YmUwJyxcclxuICBtYWdlbnRhOiAnZjg0MGI3JyxcclxuICBjeWFuOiAnMGFkOGU5JyxcclxuICBsaWdodGdyZXk6ICdlYmU3ZTMnLFxyXG4gIGRhcmtncmV5OiAnNmQ3ODkxJyxcclxufTtcclxuXHJcbnZhciBFbnRpdGllcyA9IHJlcXVpcmUoJ2h0bWwtZW50aXRpZXMnKS5BbGxIdG1sRW50aXRpZXM7XHJcbnZhciBlbnRpdGllcyA9IG5ldyBFbnRpdGllcygpO1xyXG5cclxuZnVuY3Rpb24gc2hvd1Byb2JsZW1zKHR5cGUsIGxpbmVzKSB7XHJcbiAgY2xpZW50T3ZlcmxheS5pbm5lckhUTUwgPSAnJztcclxuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKG1zZykge1xyXG4gICAgbXNnID0gYW5zaUhUTUwoZW50aXRpZXMuZW5jb2RlKG1zZykpO1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcyNnB4JztcclxuICAgIGRpdi5pbm5lckhUTUwgPSBwcm9ibGVtVHlwZSh0eXBlKSArICcgaW4gJyArIG1zZztcclxuICAgIGNsaWVudE92ZXJsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9KTtcclxuICBpZiAoZG9jdW1lbnQuYm9keSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbGllbnRPdmVybGF5KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyKCkge1xyXG4gIGlmIChkb2N1bWVudC5ib2R5ICYmIGNsaWVudE92ZXJsYXkucGFyZW50Tm9kZSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjbGllbnRPdmVybGF5KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2JsZW1UeXBlKHR5cGUpIHtcclxuICB2YXIgcHJvYmxlbUNvbG9ycyA9IHtcclxuICAgIGVycm9yczogY29sb3JzLnJlZCxcclxuICAgIHdhcm5pbmdzOiBjb2xvcnMueWVsbG93LFxyXG4gIH07XHJcbiAgdmFyIGNvbG9yID0gcHJvYmxlbUNvbG9yc1t0eXBlXSB8fCBjb2xvcnMucmVkO1xyXG4gIHJldHVybiAoXHJcbiAgICAnPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiMnICtcclxuICAgIGNvbG9yICtcclxuICAgICc7IGNvbG9yOiMwMDAwMDA7IHBhZGRpbmc6M3B4IDZweDsgYm9yZGVyLXJhZGl1czogNHB4O1wiPicgK1xyXG4gICAgdHlwZS5zbGljZSgwLCAtMSkudG9VcHBlckNhc2UoKSArXHJcbiAgICAnPC9zcGFuPidcclxuICApO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICBmb3IgKHZhciBjb2xvciBpbiBvcHRpb25zLmFuc2lDb2xvcnMpIHtcclxuICAgIGlmIChjb2xvciBpbiBjb2xvcnMpIHtcclxuICAgICAgY29sb3JzW2NvbG9yXSA9IG9wdGlvbnMuYW5zaUNvbG9yc1tjb2xvcl07XHJcbiAgICB9XHJcbiAgICBhbnNpSFRNTC5zZXRDb2xvcnMoY29sb3JzKTtcclxuICB9XHJcblxyXG4gIGZvciAodmFyIHN0eWxlIGluIG9wdGlvbnMub3ZlcmxheVN0eWxlcykge1xyXG4gICAgc3R5bGVzW3N0eWxlXSA9IG9wdGlvbnMub3ZlcmxheVN0eWxlc1tzdHlsZV07XHJcbiAgfVxyXG5cclxuICBmb3IgKHZhciBrZXkgaW4gc3R5bGVzKSB7XHJcbiAgICBjbGllbnRPdmVybGF5LnN0eWxlW2tleV0gPSBzdHlsZXNba2V5XTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaG93UHJvYmxlbXM6IHNob3dQcm9ibGVtcyxcclxuICAgIGNsZWFyOiBjbGVhcixcclxuICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMuY2xlYXIgPSBjbGVhcjtcclxubW9kdWxlLmV4cG9ydHMuc2hvd1Byb2JsZW1zID0gc2hvd1Byb2JsZW1zO1xyXG4iLCIvKmVzbGludC1lbnYgYnJvd3NlciovXHJcbi8qZ2xvYmFsIF9fcmVzb3VyY2VRdWVyeSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyovXHJcblxyXG52YXIgb3B0aW9ucyA9IHtcclxuICBwYXRoOiAnL19fd2VicGFja19obXInLFxyXG4gIHRpbWVvdXQ6IDIwICogMTAwMCxcclxuICBvdmVybGF5OiB0cnVlLFxyXG4gIHJlbG9hZDogZmFsc2UsXHJcbiAgbG9nOiB0cnVlLFxyXG4gIHdhcm46IHRydWUsXHJcbiAgbmFtZTogJycsXHJcbiAgYXV0b0Nvbm5lY3Q6IHRydWUsXHJcbiAgb3ZlcmxheVN0eWxlczoge30sXHJcbiAgb3ZlcmxheVdhcm5pbmdzOiBmYWxzZSxcclxuICBhbnNpQ29sb3JzOiB7fSxcclxufTtcclxuaWYgKF9fcmVzb3VyY2VRdWVyeSkge1xyXG4gIHZhciBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XHJcbiAgdmFyIG92ZXJyaWRlcyA9IHF1ZXJ5c3RyaW5nLnBhcnNlKF9fcmVzb3VyY2VRdWVyeS5zbGljZSgxKSk7XHJcbiAgc2V0T3ZlcnJpZGVzKG92ZXJyaWRlcyk7XHJcbn1cclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xyXG4gIC8vIGRvIG5vdGhpbmdcclxufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93LkV2ZW50U291cmNlID09PSAndW5kZWZpbmVkJykge1xyXG4gIGNvbnNvbGUud2FybihcclxuICAgIFwid2VicGFjay1ob3QtbWlkZGxld2FyZSdzIGNsaWVudCByZXF1aXJlcyBFdmVudFNvdXJjZSB0byB3b3JrLiBcIiArXHJcbiAgICAgICdZb3Ugc2hvdWxkIGluY2x1ZGUgYSBwb2x5ZmlsbCBpZiB5b3Ugd2FudCB0byBzdXBwb3J0IHRoaXMgYnJvd3NlcjogJyArXHJcbiAgICAgICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2VydmVyLXNlbnRfZXZlbnRzI1Rvb2xzJ1xyXG4gICk7XHJcbn0gZWxzZSB7XHJcbiAgaWYgKG9wdGlvbnMuYXV0b0Nvbm5lY3QpIHtcclxuICAgIGNvbm5lY3QoKTtcclxuICB9XHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbmZ1bmN0aW9uIHNldE9wdGlvbnNBbmRDb25uZWN0KG92ZXJyaWRlcykge1xyXG4gIHNldE92ZXJyaWRlcyhvdmVycmlkZXMpO1xyXG4gIGNvbm5lY3QoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0T3ZlcnJpZGVzKG92ZXJyaWRlcykge1xyXG4gIGlmIChvdmVycmlkZXMuYXV0b0Nvbm5lY3QpXHJcbiAgICBvcHRpb25zLmF1dG9Db25uZWN0ID0gb3ZlcnJpZGVzLmF1dG9Db25uZWN0ID09ICd0cnVlJztcclxuICBpZiAob3ZlcnJpZGVzLnBhdGgpIG9wdGlvbnMucGF0aCA9IG92ZXJyaWRlcy5wYXRoO1xyXG4gIGlmIChvdmVycmlkZXMudGltZW91dCkgb3B0aW9ucy50aW1lb3V0ID0gb3ZlcnJpZGVzLnRpbWVvdXQ7XHJcbiAgaWYgKG92ZXJyaWRlcy5vdmVybGF5KSBvcHRpb25zLm92ZXJsYXkgPSBvdmVycmlkZXMub3ZlcmxheSAhPT0gJ2ZhbHNlJztcclxuICBpZiAob3ZlcnJpZGVzLnJlbG9hZCkgb3B0aW9ucy5yZWxvYWQgPSBvdmVycmlkZXMucmVsb2FkICE9PSAnZmFsc2UnO1xyXG4gIGlmIChvdmVycmlkZXMubm9JbmZvICYmIG92ZXJyaWRlcy5ub0luZm8gIT09ICdmYWxzZScpIHtcclxuICAgIG9wdGlvbnMubG9nID0gZmFsc2U7XHJcbiAgfVxyXG4gIGlmIChvdmVycmlkZXMubmFtZSkge1xyXG4gICAgb3B0aW9ucy5uYW1lID0gb3ZlcnJpZGVzLm5hbWU7XHJcbiAgfVxyXG4gIGlmIChvdmVycmlkZXMucXVpZXQgJiYgb3ZlcnJpZGVzLnF1aWV0ICE9PSAnZmFsc2UnKSB7XHJcbiAgICBvcHRpb25zLmxvZyA9IGZhbHNlO1xyXG4gICAgb3B0aW9ucy53YXJuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAob3ZlcnJpZGVzLmR5bmFtaWNQdWJsaWNQYXRoKSB7XHJcbiAgICBvcHRpb25zLnBhdGggPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIG9wdGlvbnMucGF0aDtcclxuICB9XHJcblxyXG4gIGlmIChvdmVycmlkZXMuYW5zaUNvbG9ycylcclxuICAgIG9wdGlvbnMuYW5zaUNvbG9ycyA9IEpTT04ucGFyc2Uob3ZlcnJpZGVzLmFuc2lDb2xvcnMpO1xyXG4gIGlmIChvdmVycmlkZXMub3ZlcmxheVN0eWxlcylcclxuICAgIG9wdGlvbnMub3ZlcmxheVN0eWxlcyA9IEpTT04ucGFyc2Uob3ZlcnJpZGVzLm92ZXJsYXlTdHlsZXMpO1xyXG5cclxuICBpZiAob3ZlcnJpZGVzLm92ZXJsYXlXYXJuaW5ncykge1xyXG4gICAgb3B0aW9ucy5vdmVybGF5V2FybmluZ3MgPSBvdmVycmlkZXMub3ZlcmxheVdhcm5pbmdzID09ICd0cnVlJztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEV2ZW50U291cmNlV3JhcHBlcigpIHtcclxuICB2YXIgc291cmNlO1xyXG4gIHZhciBsYXN0QWN0aXZpdHkgPSBuZXcgRGF0ZSgpO1xyXG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcclxuXHJcbiAgaW5pdCgpO1xyXG4gIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKG5ldyBEYXRlKCkgLSBsYXN0QWN0aXZpdHkgPiBvcHRpb25zLnRpbWVvdXQpIHtcclxuICAgICAgaGFuZGxlRGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG4gIH0sIG9wdGlvbnMudGltZW91dCAvIDIpO1xyXG5cclxuICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgc291cmNlID0gbmV3IHdpbmRvdy5FdmVudFNvdXJjZShvcHRpb25zLnBhdGgpO1xyXG4gICAgc291cmNlLm9ub3BlbiA9IGhhbmRsZU9ubGluZTtcclxuICAgIHNvdXJjZS5vbmVycm9yID0gaGFuZGxlRGlzY29ubmVjdDtcclxuICAgIHNvdXJjZS5vbm1lc3NhZ2UgPSBoYW5kbGVNZXNzYWdlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlT25saW5lKCkge1xyXG4gICAgaWYgKG9wdGlvbnMubG9nKSBjb25zb2xlLmxvZygnW0hNUl0gY29ubmVjdGVkJyk7XHJcbiAgICBsYXN0QWN0aXZpdHkgPSBuZXcgRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShldmVudCkge1xyXG4gICAgbGFzdEFjdGl2aXR5ID0gbmV3IERhdGUoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxpc3RlbmVyc1tpXShldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVEaXNjb25uZWN0KCkge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICBzb3VyY2UuY2xvc2UoKTtcclxuICAgIHNldFRpbWVvdXQoaW5pdCwgb3B0aW9ucy50aW1lb3V0KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhZGRNZXNzYWdlTGlzdGVuZXI6IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgIGxpc3RlbmVycy5wdXNoKGZuKTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RXZlbnRTb3VyY2VXcmFwcGVyKCkge1xyXG4gIGlmICghd2luZG93Ll9fd2htRXZlbnRTb3VyY2VXcmFwcGVyKSB7XHJcbiAgICB3aW5kb3cuX193aG1FdmVudFNvdXJjZVdyYXBwZXIgPSB7fTtcclxuICB9XHJcbiAgaWYgKCF3aW5kb3cuX193aG1FdmVudFNvdXJjZVdyYXBwZXJbb3B0aW9ucy5wYXRoXSkge1xyXG4gICAgLy8gY2FjaGUgdGhlIHdyYXBwZXIgZm9yIG90aGVyIGVudHJpZXMgbG9hZGVkIG9uXHJcbiAgICAvLyB0aGUgc2FtZSBwYWdlIHdpdGggdGhlIHNhbWUgb3B0aW9ucy5wYXRoXHJcbiAgICB3aW5kb3cuX193aG1FdmVudFNvdXJjZVdyYXBwZXJbb3B0aW9ucy5wYXRoXSA9IEV2ZW50U291cmNlV3JhcHBlcigpO1xyXG4gIH1cclxuICByZXR1cm4gd2luZG93Ll9fd2htRXZlbnRTb3VyY2VXcmFwcGVyW29wdGlvbnMucGF0aF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbm5lY3QoKSB7XHJcbiAgZ2V0RXZlbnRTb3VyY2VXcmFwcGVyKCkuYWRkTWVzc2FnZUxpc3RlbmVyKGhhbmRsZU1lc3NhZ2UpO1xyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuZGF0YSA9PSAnXFx1RDgzRFxcdURDOTMnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIHByb2Nlc3NNZXNzYWdlKEpTT04ucGFyc2UoZXZlbnQuZGF0YSkpO1xyXG4gICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignSW52YWxpZCBITVIgbWVzc2FnZTogJyArIGV2ZW50LmRhdGEgKyAnXFxuJyArIGV4KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gdGhlIHJlcG9ydGVyIG5lZWRzIHRvIGJlIGEgc2luZ2xldG9uIG9uIHRoZSBwYWdlXHJcbi8vIGluIGNhc2UgdGhlIGNsaWVudCBpcyBiZWluZyB1c2VkIGJ5IG11bHRpcGxlIGJ1bmRsZXNcclxuLy8gd2Ugb25seSB3YW50IHRvIHJlcG9ydCBvbmNlLlxyXG4vLyBhbGwgdGhlIGVycm9ycyB3aWxsIGdvIHRvIGFsbCBjbGllbnRzXHJcbnZhciBzaW5nbGV0b25LZXkgPSAnX193ZWJwYWNrX2hvdF9taWRkbGV3YXJlX3JlcG9ydGVyX18nO1xyXG52YXIgcmVwb3J0ZXI7XHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gIGlmICghd2luZG93W3NpbmdsZXRvbktleV0pIHtcclxuICAgIHdpbmRvd1tzaW5nbGV0b25LZXldID0gY3JlYXRlUmVwb3J0ZXIoKTtcclxuICB9XHJcbiAgcmVwb3J0ZXIgPSB3aW5kb3dbc2luZ2xldG9uS2V5XTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmVwb3J0ZXIoKSB7XHJcbiAgdmFyIHN0cmlwID0gcmVxdWlyZSgnc3RyaXAtYW5zaScpO1xyXG5cclxuICB2YXIgb3ZlcmxheTtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zLm92ZXJsYXkpIHtcclxuICAgIG92ZXJsYXkgPSByZXF1aXJlKCcuL2NsaWVudC1vdmVybGF5Jykoe1xyXG4gICAgICBhbnNpQ29sb3JzOiBvcHRpb25zLmFuc2lDb2xvcnMsXHJcbiAgICAgIG92ZXJsYXlTdHlsZXM6IG9wdGlvbnMub3ZlcmxheVN0eWxlcyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmFyIHN0eWxlcyA9IHtcclxuICAgIGVycm9yczogJ2NvbG9yOiAjZmYwMDAwOycsXHJcbiAgICB3YXJuaW5nczogJ2NvbG9yOiAjOTk5OTMzOycsXHJcbiAgfTtcclxuICB2YXIgcHJldmlvdXNQcm9ibGVtcyA9IG51bGw7XHJcbiAgZnVuY3Rpb24gbG9nKHR5cGUsIG9iaikge1xyXG4gICAgdmFyIG5ld1Byb2JsZW1zID0gb2JqW3R5cGVdXHJcbiAgICAgIC5tYXAoZnVuY3Rpb24obXNnKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmlwKG1zZyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKCdcXG4nKTtcclxuICAgIGlmIChwcmV2aW91c1Byb2JsZW1zID09IG5ld1Byb2JsZW1zKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHByZXZpb3VzUHJvYmxlbXMgPSBuZXdQcm9ibGVtcztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3R5bGUgPSBzdHlsZXNbdHlwZV07XHJcbiAgICB2YXIgbmFtZSA9IG9iai5uYW1lID8gXCInXCIgKyBvYmoubmFtZSArIFwiJyBcIiA6ICcnO1xyXG4gICAgdmFyIHRpdGxlID0gJ1tITVJdIGJ1bmRsZSAnICsgbmFtZSArICdoYXMgJyArIG9ialt0eXBlXS5sZW5ndGggKyAnICcgKyB0eXBlO1xyXG4gICAgLy8gTk9URTogY29uc29sZS53YXJuIG9yIGNvbnNvbGUuZXJyb3Igd2lsbCBwcmludCB0aGUgc3RhY2sgdHJhY2VcclxuICAgIC8vIHdoaWNoIGlzbid0IGhlbHBmdWwgaGVyZSwgc28gdXNpbmcgY29uc29sZS5sb2cgdG8gZXNjYXBlIGl0LlxyXG4gICAgaWYgKGNvbnNvbGUuZ3JvdXAgJiYgY29uc29sZS5ncm91cEVuZCkge1xyXG4gICAgICBjb25zb2xlLmdyb3VwKCclYycgKyB0aXRsZSwgc3R5bGUpO1xyXG4gICAgICBjb25zb2xlLmxvZygnJWMnICsgbmV3UHJvYmxlbXMsIHN0eWxlKTtcclxuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgJyVjJyArIHRpdGxlICsgJ1xcblxcdCVjJyArIG5ld1Byb2JsZW1zLnJlcGxhY2UoL1xcbi9nLCAnXFxuXFx0JyksXHJcbiAgICAgICAgc3R5bGUgKyAnZm9udC13ZWlnaHQ6IGJvbGQ7JyxcclxuICAgICAgICBzdHlsZSArICdmb250LXdlaWdodDogbm9ybWFsOydcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjbGVhblByb2JsZW1zQ2FjaGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwcmV2aW91c1Byb2JsZW1zID0gbnVsbDtcclxuICAgIH0sXHJcbiAgICBwcm9ibGVtczogZnVuY3Rpb24odHlwZSwgb2JqKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLndhcm4pIHtcclxuICAgICAgICBsb2codHlwZSwgb2JqKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgIGlmIChvcHRpb25zLm92ZXJsYXlXYXJuaW5ncyB8fCB0eXBlID09PSAnZXJyb3JzJykge1xyXG4gICAgICAgICAgb3ZlcmxheS5zaG93UHJvYmxlbXModHlwZSwgb2JqW3R5cGVdKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3ZlcmxheS5jbGVhcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAob3ZlcmxheSkgb3ZlcmxheS5jbGVhcigpO1xyXG4gICAgfSxcclxuICAgIHVzZUN1c3RvbU92ZXJsYXk6IGZ1bmN0aW9uKGN1c3RvbU92ZXJsYXkpIHtcclxuICAgICAgb3ZlcmxheSA9IGN1c3RvbU92ZXJsYXk7XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuXHJcbnZhciBwcm9jZXNzVXBkYXRlID0gcmVxdWlyZSgnLi9wcm9jZXNzLXVwZGF0ZScpO1xyXG5cclxudmFyIGN1c3RvbUhhbmRsZXI7XHJcbnZhciBzdWJzY3JpYmVBbGxIYW5kbGVyO1xyXG5mdW5jdGlvbiBwcm9jZXNzTWVzc2FnZShvYmopIHtcclxuICBzd2l0Y2ggKG9iai5hY3Rpb24pIHtcclxuICAgIGNhc2UgJ2J1aWxkaW5nJzpcclxuICAgICAgaWYgKG9wdGlvbnMubG9nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAnW0hNUl0gYnVuZGxlICcgK1xyXG4gICAgICAgICAgICAob2JqLm5hbWUgPyBcIidcIiArIG9iai5uYW1lICsgXCInIFwiIDogJycpICtcclxuICAgICAgICAgICAgJ3JlYnVpbGRpbmcnXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2J1aWx0JzpcclxuICAgICAgaWYgKG9wdGlvbnMubG9nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAnW0hNUl0gYnVuZGxlICcgK1xyXG4gICAgICAgICAgICAob2JqLm5hbWUgPyBcIidcIiArIG9iai5uYW1lICsgXCInIFwiIDogJycpICtcclxuICAgICAgICAgICAgJ3JlYnVpbHQgaW4gJyArXHJcbiAgICAgICAgICAgIG9iai50aW1lICtcclxuICAgICAgICAgICAgJ21zJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIC8vIGZhbGwgdGhyb3VnaFxyXG4gICAgY2FzZSAnc3luYyc6XHJcbiAgICAgIGlmIChvYmoubmFtZSAmJiBvcHRpb25zLm5hbWUgJiYgb2JqLm5hbWUgIT09IG9wdGlvbnMubmFtZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB2YXIgYXBwbHlVcGRhdGUgPSB0cnVlO1xyXG4gICAgICBpZiAob2JqLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHJlcG9ydGVyKSByZXBvcnRlci5wcm9ibGVtcygnZXJyb3JzJywgb2JqKTtcclxuICAgICAgICBhcHBseVVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2UgaWYgKG9iai53YXJuaW5ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHJlcG9ydGVyKSB7XHJcbiAgICAgICAgICB2YXIgb3ZlcmxheVNob3duID0gcmVwb3J0ZXIucHJvYmxlbXMoJ3dhcm5pbmdzJywgb2JqKTtcclxuICAgICAgICAgIGFwcGx5VXBkYXRlID0gb3ZlcmxheVNob3duO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocmVwb3J0ZXIpIHtcclxuICAgICAgICAgIHJlcG9ydGVyLmNsZWFuUHJvYmxlbXNDYWNoZSgpO1xyXG4gICAgICAgICAgcmVwb3J0ZXIuc3VjY2VzcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoYXBwbHlVcGRhdGUpIHtcclxuICAgICAgICBwcm9jZXNzVXBkYXRlKG9iai5oYXNoLCBvYmoubW9kdWxlcywgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBpZiAoY3VzdG9tSGFuZGxlcikge1xyXG4gICAgICAgIGN1c3RvbUhhbmRsZXIob2JqKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHN1YnNjcmliZUFsbEhhbmRsZXIpIHtcclxuICAgIHN1YnNjcmliZUFsbEhhbmRsZXIob2JqKTtcclxuICB9XHJcbn1cclxuXHJcbmlmIChtb2R1bGUpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHN1YnNjcmliZUFsbDogZnVuY3Rpb24gc3Vic2NyaWJlQWxsKGhhbmRsZXIpIHtcclxuICAgICAgc3Vic2NyaWJlQWxsSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICB9LFxyXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUoaGFuZGxlcikge1xyXG4gICAgICBjdXN0b21IYW5kbGVyID0gaGFuZGxlcjtcclxuICAgIH0sXHJcbiAgICB1c2VDdXN0b21PdmVybGF5OiBmdW5jdGlvbiB1c2VDdXN0b21PdmVybGF5KGN1c3RvbU92ZXJsYXkpIHtcclxuICAgICAgaWYgKHJlcG9ydGVyKSByZXBvcnRlci51c2VDdXN0b21PdmVybGF5KGN1c3RvbU92ZXJsYXkpO1xyXG4gICAgfSxcclxuICAgIHNldE9wdGlvbnNBbmRDb25uZWN0OiBzZXRPcHRpb25zQW5kQ29ubmVjdCxcclxuICB9O1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIC9bXFx1MDAxYlxcdTAwOWJdW1soKSM7P10qKD86WzAtOV17MSw0fSg/OjtbMC05XXswLDR9KSopP1swLTlBLVBSWmNmLW5xcnk9PjxdL2c7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxudmFyIGFuc2lSZWdleCA9IHJlcXVpcmUoJ2Fuc2ktcmVnZXgnKSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0cmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyLnJlcGxhY2UoYW5zaVJlZ2V4LCAnJykgOiBzdHI7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBCYXNlZCBoZWF2aWx5IG9uIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrL3dlYnBhY2svYmxvYi9cclxuICogIGMwYWZkZjljNmFiYzFkZDcwNzA3YzU5NGU0NzM4MDJhNTY2ZjdiNmUvaG90L29ubHktZGV2LXNlcnZlci5qc1xyXG4gKiBPcmlnaW5hbCBjb3B5cmlnaHQgVG9iaWFzIEtvcHBlcnMgQHNva3JhIChNSVQgbGljZW5zZSlcclxuICovXHJcblxyXG4vKiBnbG9iYWwgd2luZG93IF9fd2VicGFja19oYXNoX18gKi9cclxuXHJcbmlmICghbW9kdWxlLmhvdCkge1xyXG4gIHRocm93IG5ldyBFcnJvcignW0hNUl0gSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBkaXNhYmxlZC4nKTtcclxufVxyXG5cclxudmFyIGhtckRvY3NVcmwgPSAnaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50Lyc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlblxyXG5cclxudmFyIGxhc3RIYXNoO1xyXG52YXIgZmFpbHVyZVN0YXR1c2VzID0geyBhYm9ydDogMSwgZmFpbDogMSB9O1xyXG52YXIgYXBwbHlPcHRpb25zID0ge1xyXG4gIGlnbm9yZVVuYWNjZXB0ZWQ6IHRydWUsXHJcbiAgaWdub3JlRGVjbGluZWQ6IHRydWUsXHJcbiAgaWdub3JlRXJyb3JlZDogdHJ1ZSxcclxuICBvblVuYWNjZXB0ZWQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgJ0lnbm9yZWQgYW4gdXBkYXRlIHRvIHVuYWNjZXB0ZWQgbW9kdWxlICcgKyBkYXRhLmNoYWluLmpvaW4oJyAtPiAnKVxyXG4gICAgKTtcclxuICB9LFxyXG4gIG9uRGVjbGluZWQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgJ0lnbm9yZWQgYW4gdXBkYXRlIHRvIGRlY2xpbmVkIG1vZHVsZSAnICsgZGF0YS5jaGFpbi5qb2luKCcgLT4gJylcclxuICAgICk7XHJcbiAgfSxcclxuICBvbkVycm9yZWQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZGF0YS5lcnJvcik7XHJcbiAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICdJZ25vcmVkIGFuIGVycm9yIHdoaWxlIHVwZGF0aW5nIG1vZHVsZSAnICtcclxuICAgICAgICBkYXRhLm1vZHVsZUlkICtcclxuICAgICAgICAnICgnICtcclxuICAgICAgICBkYXRhLnR5cGUgK1xyXG4gICAgICAgICcpJ1xyXG4gICAgKTtcclxuICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gdXBUb0RhdGUoaGFzaCkge1xyXG4gIGlmIChoYXNoKSBsYXN0SGFzaCA9IGhhc2g7XHJcbiAgcmV0dXJuIGxhc3RIYXNoID09IF9fd2VicGFja19oYXNoX187XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaGFzaCwgbW9kdWxlTWFwLCBvcHRpb25zKSB7XHJcbiAgdmFyIHJlbG9hZCA9IG9wdGlvbnMucmVsb2FkO1xyXG4gIGlmICghdXBUb0RhdGUoaGFzaCkgJiYgbW9kdWxlLmhvdC5zdGF0dXMoKSA9PSAnaWRsZScpIHtcclxuICAgIGlmIChvcHRpb25zLmxvZykgY29uc29sZS5sb2coJ1tITVJdIENoZWNraW5nIGZvciB1cGRhdGVzIG9uIHRoZSBzZXJ2ZXIuLi4nKTtcclxuICAgIGNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGVjaygpIHtcclxuICAgIHZhciBjYiA9IGZ1bmN0aW9uKGVyciwgdXBkYXRlZE1vZHVsZXMpIHtcclxuICAgICAgaWYgKGVycikgcmV0dXJuIGhhbmRsZUVycm9yKGVycik7XHJcblxyXG4gICAgICBpZiAoIXVwZGF0ZWRNb2R1bGVzKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdbSE1SXSBDYW5ub3QgZmluZCB1cGRhdGUgKEZ1bGwgcmVsb2FkIG5lZWRlZCknKTtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignW0hNUl0gKFByb2JhYmx5IGJlY2F1c2Ugb2YgcmVzdGFydGluZyB0aGUgc2VydmVyKScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwZXJmb3JtUmVsb2FkKCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhcHBseUNhbGxiYWNrID0gZnVuY3Rpb24oYXBwbHlFcnIsIHJlbmV3ZWRNb2R1bGVzKSB7XHJcbiAgICAgICAgaWYgKGFwcGx5RXJyKSByZXR1cm4gaGFuZGxlRXJyb3IoYXBwbHlFcnIpO1xyXG5cclxuICAgICAgICBpZiAoIXVwVG9EYXRlKCkpIGNoZWNrKCk7XHJcblxyXG4gICAgICAgIGxvZ1VwZGF0ZXModXBkYXRlZE1vZHVsZXMsIHJlbmV3ZWRNb2R1bGVzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHZhciBhcHBseVJlc3VsdCA9IG1vZHVsZS5ob3QuYXBwbHkoYXBwbHlPcHRpb25zLCBhcHBseUNhbGxiYWNrKTtcclxuICAgICAgLy8gd2VicGFjayAyIHByb21pc2VcclxuICAgICAgaWYgKGFwcGx5UmVzdWx0ICYmIGFwcGx5UmVzdWx0LnRoZW4pIHtcclxuICAgICAgICAvLyBIb3RNb2R1bGVSZXBsYWNlbWVudC5ydW50aW1lLmpzIHJlZmVycyB0byB0aGUgcmVzdWx0IGFzIGBvdXRkYXRlZE1vZHVsZXNgXHJcbiAgICAgICAgYXBwbHlSZXN1bHQudGhlbihmdW5jdGlvbihvdXRkYXRlZE1vZHVsZXMpIHtcclxuICAgICAgICAgIGFwcGx5Q2FsbGJhY2sobnVsbCwgb3V0ZGF0ZWRNb2R1bGVzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBseVJlc3VsdC5jYXRjaChhcHBseUNhbGxiYWNrKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gbW9kdWxlLmhvdC5jaGVjayhmYWxzZSwgY2IpO1xyXG4gICAgLy8gd2VicGFjayAyIHByb21pc2VcclxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRoZW4pIHtcclxuICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24odXBkYXRlZE1vZHVsZXMpIHtcclxuICAgICAgICBjYihudWxsLCB1cGRhdGVkTW9kdWxlcyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXN1bHQuY2F0Y2goY2IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbG9nVXBkYXRlcyh1cGRhdGVkTW9kdWxlcywgcmVuZXdlZE1vZHVsZXMpIHtcclxuICAgIHZhciB1bmFjY2VwdGVkTW9kdWxlcyA9IHVwZGF0ZWRNb2R1bGVzLmZpbHRlcihmdW5jdGlvbihtb2R1bGVJZCkge1xyXG4gICAgICByZXR1cm4gcmVuZXdlZE1vZHVsZXMgJiYgcmVuZXdlZE1vZHVsZXMuaW5kZXhPZihtb2R1bGVJZCkgPCAwO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHVuYWNjZXB0ZWRNb2R1bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAgIFwiW0hNUl0gVGhlIGZvbGxvd2luZyBtb2R1bGVzIGNvdWxkbid0IGJlIGhvdCB1cGRhdGVkOiBcIiArXHJcbiAgICAgICAgICAgICcoRnVsbCByZWxvYWQgbmVlZGVkKVxcbicgK1xyXG4gICAgICAgICAgICAnVGhpcyBpcyB1c3VhbGx5IGJlY2F1c2UgdGhlIG1vZHVsZXMgd2hpY2ggaGF2ZSBjaGFuZ2VkICcgK1xyXG4gICAgICAgICAgICAnKGFuZCB0aGVpciBwYXJlbnRzKSBkbyBub3Qga25vdyBob3cgdG8gaG90IHJlbG9hZCB0aGVtc2VsdmVzLiAnICtcclxuICAgICAgICAgICAgJ1NlZSAnICtcclxuICAgICAgICAgICAgaG1yRG9jc1VybCArXHJcbiAgICAgICAgICAgICcgZm9yIG1vcmUgZGV0YWlscy4nXHJcbiAgICAgICAgKTtcclxuICAgICAgICB1bmFjY2VwdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uKG1vZHVsZUlkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1tITVJdICAtICcgKyAobW9kdWxlTWFwW21vZHVsZUlkXSB8fCBtb2R1bGVJZCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHBlcmZvcm1SZWxvYWQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zLmxvZykge1xyXG4gICAgICBpZiAoIXJlbmV3ZWRNb2R1bGVzIHx8IHJlbmV3ZWRNb2R1bGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbSE1SXSBOb3RoaW5nIGhvdCB1cGRhdGVkLicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbSE1SXSBVcGRhdGVkIG1vZHVsZXM6Jyk7XHJcbiAgICAgICAgcmVuZXdlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbihtb2R1bGVJZCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1tITVJdICAtICcgKyAobW9kdWxlTWFwW21vZHVsZUlkXSB8fCBtb2R1bGVJZCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodXBUb0RhdGUoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdbSE1SXSBBcHAgaXMgdXAgdG8gZGF0ZS4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyKSB7XHJcbiAgICBpZiAobW9kdWxlLmhvdC5zdGF0dXMoKSBpbiBmYWlsdXJlU3RhdHVzZXMpIHtcclxuICAgICAgaWYgKG9wdGlvbnMud2Fybikge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignW0hNUl0gQ2Fubm90IGNoZWNrIGZvciB1cGRhdGUgKEZ1bGwgcmVsb2FkIG5lZWRlZCknKTtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1tITVJdICcgKyAoZXJyLnN0YWNrIHx8IGVyci5tZXNzYWdlKSk7XHJcbiAgICAgIH1cclxuICAgICAgcGVyZm9ybVJlbG9hZCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy53YXJuKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignW0hNUl0gVXBkYXRlIGNoZWNrIGZhaWxlZDogJyArIChlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBlcmZvcm1SZWxvYWQoKSB7XHJcbiAgICBpZiAocmVsb2FkKSB7XHJcbiAgICAgIGlmIChvcHRpb25zLndhcm4pIGNvbnNvbGUud2FybignW0hNUl0gUmVsb2FkaW5nIHBhZ2UnKTtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxyXG5cclxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbmZ1bmN0aW9uIGV4dGVuZCgpIHtcclxuICAgIHZhciB0YXJnZXQgPSB7fVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0YXJnZXRcclxufVxyXG4iLCJpbXBvcnQgJy4vc2Nzcy9tYWluLnNjc3MnO1xyXG5pbXBvcnQgJy4vanMvdG9wQmFyLmpzJztcclxuXHJcbi8vIE5lZWRlZCBmb3IgSG90IE1vZHVsZSBSZXBsYWNlbWVudFxyXG5pZih0eXBlb2YobW9kdWxlLmhvdCkgIT09ICd1bmRlZmluZWQnKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuICBtb2R1bGUuaG90LmFjY2VwdCgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxufVxyXG4iLCJpbXBvcnQge01EQ1RvcEFwcEJhcn0gZnJvbSBcIkBtYXRlcmlhbC90b3AtYXBwLWJhclwiO1xyXG5pbXBvcnQge01EQ0RyYXdlcn0gZnJvbSBcIkBtYXRlcmlhbC9kcmF3ZXJcIjtcclxuXHJcbmNvbnN0IHRvcEFwcEJhciA9IE1EQ1RvcEFwcEJhci5hdHRhY2hUbyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwLWJhcicpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxyXG5jb25zdCBkcmF3ZXIgPSBNRENEcmF3ZXIuYXR0YWNoVG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1kcmF3ZXInKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcclxuXHJcbnRvcEFwcEJhci5zZXRTY3JvbGxUYXJnZXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4tY29udGVudCcpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxyXG50b3BBcHBCYXIubGlzdGVuKCdNRENUb3BBcHBCYXI6bmF2JywgKCkgPT4ge1xyXG4gIGRyYXdlci5vcGVuID0gIWRyYXdlci5vcGVuO1xyXG59KTtcclxuIiwidmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS03LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTctMiEuL21haW4uc2Nzc1wiKTtcblxuaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG59XG5cbnZhciBvcHRpb25zID0ge31cblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYgKGNvbnRlbnQubG9jYWxzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG59XG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIGlmICghY29udGVudC5sb2NhbHMpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdChcbiAgICAgIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS03LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTctMiEuL21haW4uc2Nzc1wiLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTctMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNy0yIS4vbWFpbi5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IFxuICAgIHVwZGF0ZSgpO1xuICB9KTtcbn0iXSwic291cmNlUm9vdCI6IiJ9