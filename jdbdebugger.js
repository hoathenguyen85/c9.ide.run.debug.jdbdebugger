/*
* @parameter require - 
* @parameter exports - 
* @parameter module  - 
*
*/
define(function(require, exports, module) {
    main.consumes = ["Plugin", "debugger"];
    main.provides = ["jdbdebugger"];
    return main;
    
    /*
    * @parameter options  - 
    * @parameter importss   - has list of libraries available to imports
    * @parameter register - 
    *
    */
    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        
        /* data objects
        * Frame      - is the item that is on the call stack and references the source code
        * Breakpoint - where the code stops on the IDE
        * Scope      - the different scope that exists and the variables under each scopes
        * Source     - the mapped source code
        * Variable   - the single variable in the scope
        */
        var Frame = imports["debugger"].Frame;
        var Breakpoint = imports["debugger"].Breakpoint;
        var Scope = imports["debugger"].Scope;
        var Source = imports["debugger"].Source;
        var Variable = imports["debugger"].Variable;
        
        var TYPE = "jdb";
        
        var attach = false;
        var state = null;
        var breakOnExceptions = null;
        var breakOnUncaughtExceptions = null;
        
        
        // initializes the plugin
        var plugin = new Plugin("jdbdebugger", main.consumes);
        // TODO look at Plugin API
        var emit = plugin.getEmitter();
        emit.setMaxListeners(1000);
        
        plugin.on("load", function() {
            imports["debugger"].registerDebugger(TYPE, plugin);
        });
        plugin.on("unload", function() {
            imports["debugger"].unregisterDebugger(TYPE, plugin);
        
            var attach = false;
            var state = null;
            var breakOnExceptions = null;
            var breakOnUncaughtExceptions = null;
        });
        
        plugin.freezePublicAPI({
            type: TYPE,
            features: {
                                                // Able to:
                scripts: false,                  // download code (if false: disable the scripts button)
                conditionalBreakpoints: false,   // have conditional breakpoints (if false: disable menu item)
                liveUpdate: false,               // update code live (if false: don't do anything when saving)
                updateWatchedVariables: false,   // edit vars in watches (if false: don't show editor)
                updateScopeVariables: false,     // edit vars in variables panel (if false: don't show editor)
                setBreakBehavior: false,         // configure break behavior (if false: disables button)
                executeCode: false               // execute code (if false: disable REPL)
            },
            get state(){ return state; },
            get attached(){ return attached; },
            get breakOnExceptions(){ return breakOnExceptions; },
            get breakOnUncaughtExceptions(){ return breakOnUncaughtExceptions; },
            
            _events: ["attach", "detach", "error", "break", "frameActivate", "getFrames", "suspend"],
            
            attach: function(){
                console.log("attach");
            },
            detach: function(){
                console.log("detach");
            },
            getSources: function(){
                console.log("getSources");
            },
            getSource: function(){
                console.log("getSource");
            },
            getFrames: function(){
                console.log("getFrames");
            },
            getScope: function(){
                console.log("getScope");
            },
            getProperties: function(){
                console.log("getProperties");
            },
            stepInto: function(){
                console.log("stepInto");
            },
            stepOver: function(){
                console.log("stepOver");
            },
            stepOut: function(){
                console.log("stepOut");
            },
            resume: function(){
                console.log("resume");
            },
            suspend: function(){
                console.log("suspend");
            },
            evaluate: function(){
                console.log("evaluate");
            },
            setScriptSource: function(){
                console.log("setScriptSource");
            },
            setBreakpoint: function(){
                console.log("setBreakpoint");
            },
            changeBreakpoint: function(){
                console.log("changeBreakpoint");
            },
            clearBreakpoint: function(){
                console.log("clearBreakpoint");
            },
            listBreakpoints: function(){
                console.log("listBreakpoints");
            },
            setVariable: function(){
                console.log("setVariable");
            },
            restartFrame: function(){
                console.log("restartFrame");
            },
            serializeVariable: function(){
                console.log("serializeVariable");
            },
            setBreakBehavior: function(){
                console.log("setBreakBehavior");
            },
            getProxySource: function(){
                console.log("getProxySource");
            },
        });
        
        register(null, {
            "jdbdebugger": plugin
        });
        
    }
});