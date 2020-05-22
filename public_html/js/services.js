mokkidb.service("lajit", function(){
    this.lajit =["puu", "työkalut","test"];
    
    this.lisaaLaji = function(laji){
        this.lajit.push(laji);
    };
    
    this.haeLajit = function(){
        return this.lajit;
    };
    
});