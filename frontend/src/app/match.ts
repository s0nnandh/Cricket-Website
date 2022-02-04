export class Match {

    match_id : number;
    Team1 : string;
    Team2 : string;
    constructor(match_id : number,a : string,b : string){
        this.match_id = match_id;
        this.Team1 = a;
        this.Team2 = b;
    }
        
}