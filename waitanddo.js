function waitAndDo(opts) {
    /*
        will run a check repetitively until it passes and then run the do() method.
        useful for lazy-loading assets that are going to load anyways, but they
        are loading a bit out of order
      
        REQUIRED
      
        - opts.test() needs to be a function so that it can be re-evaluated each time
        the timer runs
        - opts.fail() will fire if the thing takes too long
        
        OPTIONAL
        
        - opts.silentFail [bool] will allow failure but not throw error (if opts.fail() is not specified)
        - opts.interval [number] overrides the interval variable
        - opts.maxPolls [number] multiplier of interval for how many checks to make before determining failure
    */
    
    var timer
        //milliseconds between polls
        , interval = opts.interval || 20
        
        //number of polls to make
        , maxTime = interval * (opts.maxPolls || 500)
        , count = 0
    ;
    
    //test passes, do the thing immediately
    if (opts.test()) {
        opts.do();
    } else {
        
        //poll test() until it passes or time runs out
        timer = setInterval(function(){
            if (opts.test()) {
                clearInterval(timer);
                opts.do();
            }
            
            //check to see if you've run out of time
            if (count*interval >= maxTime) {
                clearInterval(timer);
                
                if (opts.fail) {
                    opts.fail();
                } else if (!opts.silentFail) {
                    throw new Error('Unable to satisfy test: ' + opts.test.toString());
                }
            }
            count++;
        }, interval);
    }
}
