const express = require("express");
const app = express();
const pool = require('./server.js');
app.use(express.json())




app.get('/matches/:id1/:id2',async (req ,res) =>{
    try {

        const id1 = req.params.id1;
        const id2 = req.params.id2;
        const allt = await pool.query("select team_name as winner , team1 ,team2 , city_name , venue_name  ,win_type,win_margin from team , (select  t1.team_name as team1 , t2.team_name as team2 , city_name , venue_name , match_winner ,win_type,win_margin from team as t1, team as t2 ,(select * from (select * , rank() over (order by match_id desc) as rank from match  order by match_id desc) as v,venue  where venue.venue_id = v.venue_id and rank >= $1 and rank <= $2) as z where team1 = t1.team_id and team2 = t2.team_id) as t where t.match_winner = team.team_id",[id1,id2]);
        res.json(allt);
        
    } catch (error) {
        console.error(error.message);
    }
});
app.get('/match_id/batsmen/:id3/:id4',async (req ,res) =>{
    try {
        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select striker,player_name , runs  ,fours,sixes , balls_faced from (select striker,sum(b.runs_scored) as runs ,count(case when b.runs_scored = 4 then 1 end) as fours,count(case when b.runs_scored = 6 then 1 end) as sixes  ,count(*) as Balls_faced from (select * from match where match_id = $1) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by striker) as m , player where m.striker = player.player_id",[id1,id2]);

        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_id/bowler/:id3/:id4',async (req ,res) =>{
    try {
        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select bowler,player_name ,balls_bowled,runs_given,wickets from (select bowler,sum(b.runs_scored) as runs_given ,count(*) as Balls_bowled , COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from (select * from match where match_id = $1 ) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by bowler) as m , player where m.bowler = player.player_id",[id1,id2]);

        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_id/extra_runs/:id3/:id4',async (req ,res) =>{
    try {

        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select sum(extra_runs) as extra_runs, sum(runs_scored+extra_runs) as total,count(case when out_type is not NULL then 1 end)  as wickets from ball_by_ball where match_id = $1 and innings_no = $2;",[id1,id2]);

        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_graph/:id3/:id4',async (req ,res) =>{
    try {
        console.log("Innings  extraruns scorecard");
        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select * from ball_by_ball where match_id = $1 and innings_no = $2 order by over_id asc , ball_id asc",[id1,id2]);

        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_summary/batsmen/:id3/:id4',async (req ,res) =>{
    try {

        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select * from (select  player_id,player_name ,runs,balls_faced,rank() over (order by runs desc, Balls_faced desc ,player_name )  from (select striker,sum(b.runs_scored) as runs ,count(case when b.runs_scored = 4 then 1 end) as fours,count(case when b.runs_scored = 6 then 1 end) as sixes  ,count(*) as Balls_faced from (select * from match where match_id = $1) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by striker) as m , player where m.striker = player.player_id) as z where rank<=3",[id1,id2])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_summary/bowler/:id3/:id4',async (req ,res) =>{
    try {

        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select * from (select bowler,player_name ,balls_bowled,runs_given,wickets,rank() over (order by wickets desc, runs_given desc ,player_name ) from (select bowler,sum(b.runs_scored) as runs_given ,count(*) as Balls_bowled , COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from (select * from match where match_id = $1 ) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by bowler) as m , player where m.bowler = player.player_id) as mm where rank <=3 and wickets!=0 ", [id1,id2])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_pie/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select ones , twos*2 as twos, threes*3 as threes, fours*4 as fours, sixes*6 as sixes ,extras from (select count(case when runs_scored = 1 then 1 end) as ones , count(case when runs_scored = 2 then 1 end) as twos,count(case when runs_scored = 3 then 1 end) as threes,count(case when runs_scored = 4 then 1 end) as fours,count(case when runs_scored = 6 then 1 end) as sixes ,sum(extra_runs) as extras from ball_by_ball where match_id = $1) as v ;   ", [id1])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/player_info/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select * from player where player_id = $1",[id1])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});
// view can be creaated 
app.get('/player_info2.0/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , striker , matches , runs , fours, sixes , fifties , hs , strike_rate , average from (select striker,mat as Matches , runs , fours , sixes , fifties , max_runs as HS , ((1.0*runs)/(1.0*balls))*100 as Strike_Rate , (1.0*runs)/(outs+1.0) as Average from (select count(*) as mat, sum(outs) as outs ,striker ,count(case when runs>=50 then 1 end) as fifties, sum(runs) as runs ,sum(balls) as balls, max(runs) as Max_runs,  sum(fours) as fours , sum(sixes) as sixes from (select striker,sum(runs_scored) as runs,count(*) as balls ,count(case when out_type is not NULL then 1 end) as outs , count(case when runs_scored = 4 then 1 end) as fours , COUNT(case when runs_scored = 6 then 1 end) as sixes from ball_by_ball group by match_id ,striker order by striker) as v group by striker) as v ) as m, player where striker = $1 and striker = player_id ",[id1])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
});
// view can be created
app.get('/player_info3.0/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , striker , match_id , runs from (select striker,match_id,sum(runs_scored) as runs from ball_by_ball group by match_id , striker order by match_id) as v , player where player.player_id = striker and striker = $1;",[id1])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
}); 
// view can be created

app.get('/bowler_info/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , bowler , r as runs , b as balls , w as wickets , five as five_wickets from (select bowler , sum(runs) as r, sum(balls) as b , sum(wickets) as w , count(case when wickets >= 5 then 1 end) as five from (select bowler,sum(runs_scored+extra_runs) as runs,count(*) as balls ,COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from ball_by_ball group by match_id ,bowler order by bowler) as v group by bowler ) as m , player where bowler = player_id and bowler = $1",[id1])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
}); 

app.get('/bowler_info2.0/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , bowler , match_id , runs ,wickets from (select bowler,match_id,sum(runs_scored+extra_runs) as runs,COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from ball_by_ball group by match_id , bowler order by match_id) as v , player where player.player_id = bowler and bowler = $1",[id1])
        res.json(allt1);

        
    } catch (error) {
        console.error(error.message);
    }
}); 

app.listen(3006,() => {
});