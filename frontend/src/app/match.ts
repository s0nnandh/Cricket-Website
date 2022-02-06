export class Match {

    match_id : number;
    team1? : string;
    team2? : string;
    Stadium? : string;
    city? : string;
    Result? : string;
    constructor(match_id : number,a : string,b : string,std : string,c : string,r : string){
        this.match_id = match_id;
        this.team1 = a;
        this.team2 = b;
        this.Stadium = std;
        this.city = c;
        this.Result = r;
    }

    // constructor(mp : Object){
    //     this.match_id = 1
    //     Object.assign(this.team1,);
    // }
    
    // constructor(mp : Map<string,string>){
    //     this.match_id = 1;
    //     this.Result = mp.get("winner");
    //     this.Stadium = mp.get("venue_name");
    //     this.Team1 = mp.get("team1");        
    //     this.Team2 = mp.get("team2");
    //     this.city = mp.get("city_name");
    // }

}