waitanddo
=========

Useful utility function for ensuring assets are loaded before trying to use them.

To use, imagine that you're loading a file and you want to make sure it exists before trying to use it:

    load('/mycoolthing.js');
    
    waitAndDo({
        test: function() { return !!MyCoolThing; }
        , do: MyCoolThing.init
    });
