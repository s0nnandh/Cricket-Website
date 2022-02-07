const express = require("express");
const app = express();
const pool = require('./server.js');
app.use(express.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/matches/:id1/:id2',async (req ,res) =>{
    try {

        const id1 = req.params.id1;
        const id2 = req.params.id2;
        const allt = await pool.query("select match_id,team_name as winner , team1 ,team2 , city_name , venue_name  ,win_type,win_margin from team , (select  match_id,t1.team_name as team1 , t2.team_name as team2 , city_name , venue_name , match_winner ,win_type,win_margin from team as t1, team as t2 ,(select * from (select * , rank() over (order by match_id desc) as rank from match  order by match_id desc) as v,venue  where venue.venue_id = v.venue_id and rank >= $1 and rank <= $2) as z where team1 = t1.team_id and team2 = t2.team_id) as t where t.match_winner = team.team_id",[id1,id2]);
        res.json(allt.rows);
        
    } catch (error) {
        console.error(error.message);
    }
});
app.get('/match_id/batsmen/:id3/:id4',async (req ,res) =>{
    try {
        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select striker,player_name , runs  ,fours,sixes , balls_faced from (select striker,sum(b.runs_scored) as runs ,count(case when b.runs_scored = 4 then 1 end) as fours,count(case when b.runs_scored = 6 then 1 end) as sixes  ,count(*) as Balls_faced from (select * from match where match_id = $1) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by striker) as m , player where m.striker = player.player_id",[id1,id2]);

        res.json(allt1.rows);
        console.log('HELLO',id1,id2);
        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_id/bowler/:id3/:id4',async (req ,res) =>{
    try {
        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select bowler,player_name ,balls_bowled,runs_given,wickets from (select bowler,sum(b.runs_scored) as runs_given ,count(*) as Balls_bowled , COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from (select * from match where match_id = $1 ) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by bowler) as m , player where m.bowler = player.player_id",[id1,id2]);

        res.json(allt1.rows);

        console.log('Bowler',id1,id2);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_id/extra_runs/:id3/:id4',async (req ,res) =>{
    try {

        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select sum(extra_runs) as extra_runs, sum(runs_scored+extra_runs) as total,count(case when out_type is not NULL then 1 end)  as wickets from ball_by_ball where match_id = $1 and innings_no = $2;",[id1,id2]);

        res.json(allt1.rows);

        
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

        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_summary/batsmen/:id3/:id4',async (req ,res) =>{
    try {

        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select * from (select  player_id,player_name ,runs,balls_faced,rank() over (order by runs desc, Balls_faced desc ,player_name )  from (select striker,sum(b.runs_scored) as runs ,count(case when b.runs_scored = 4 then 1 end) as fours,count(case when b.runs_scored = 6 then 1 end) as sixes  ,count(*) as Balls_faced from (select * from match where match_id = $1) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by striker) as m , player where m.striker = player.player_id) as z where rank<=3",[id1,id2])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_summary/bowler/:id3/:id4',async (req ,res) =>{
    try {

        const id1 = req.params.id3;
        const id2 = req.params.id4;
        const allt1 = await pool.query("select * from (select bowler,player_name ,balls_bowled,runs_given,wickets,rank() over (order by wickets desc, runs_given desc ,player_name ) from (select bowler,sum(b.runs_scored) as runs_given ,count(*) as Balls_bowled , COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from (select * from match where match_id = $1 ) as v , ball_by_ball as b where v.match_id = b.match_id and innings_no = $2 group by bowler) as m , player where m.bowler = player.player_id) as mm where rank <=3 and wickets!=0 ", [id1,id2])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/match_pie/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select ones , twos*2 as twos, threes*3 as threes, fours*4 as fours, sixes*6 as sixes ,extras from (select count(case when runs_scored = 1 then 1 end) as ones , count(case when runs_scored = 2 then 1 end) as twos,count(case when runs_scored = 3 then 1 end) as threes,count(case when runs_scored = 4 then 1 end) as fours,count(case when runs_scored = 6 then 1 end) as sixes ,sum(extra_runs) as extras from ball_by_ball where match_id = $1) as v ;   ", [id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/player_info/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select * from player where player_id = $1",[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});
// view can be creaated 
app.get('/player_info2/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , striker , matches , runs , fours, sixes , fifties , hs , strike_rate , average from (select striker,mat as Matches , runs , fours , sixes , fifties , max_runs as HS , ((1.0*runs)/(1.0*balls))*100 as Strike_Rate , (1.0*runs)/(outs+1.0) as Average from (select count(*) as mat, sum(outs) as outs ,striker ,count(case when runs>=50 then 1 end) as fifties, sum(runs) as runs ,sum(balls) as balls, max(runs) as Max_runs,  sum(fours) as fours , sum(sixes) as sixes from (select striker,sum(runs_scored) as runs,count(*) as balls ,count(case when out_type is not NULL then 1 end) as outs , count(case when runs_scored = 4 then 1 end) as fours , COUNT(case when runs_scored = 6 then 1 end) as sixes from ball_by_ball group by match_id ,striker order by striker) as v group by striker) as v ) as m, player where striker = $1 and striker = player_id ",[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});
// view can be created
app.get('/player_info3/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , striker , match_id , runs from (select striker,match_id,sum(runs_scored) as runs from ball_by_ball group by match_id , striker order by match_id) as v , player where player.player_id = striker and striker = $1;",[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
}); 
// view can be created

app.get('/bowler_info/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , bowler , r as runs , b as balls , w as wickets , five as five_wickets from (select bowler , sum(runs) as r, sum(balls) as b , sum(wickets) as w , count(case when wickets >= 5 then 1 end) as five from (select bowler,sum(runs_scored+extra_runs) as runs,count(*) as balls ,COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from ball_by_ball group by match_id ,bowler order by bowler) as v group by bowler ) as m , player where bowler = player_id and bowler = $1",[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
}); 

app.get('/bowler_info2/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query("select player_name , bowler , match_id , runs ,wickets from (select bowler,match_id,sum(runs_scored+extra_runs) as runs,COUNT(CASE WHEN out_type != 'run out' and out_type != 'retired hurt' and out_type is not NULL THEN 1 END) as wickets from ball_by_ball group by match_id , bowler order by match_id) as v , player where player.player_id = bowler and bowler = $1",[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
}); 

app.get('/pointstable/:id1',async (req ,res) =>{
    try {

        const id1 = req.params.id1;

        const allt1 = await pool.query(`
            with Point(nmatch, wins , lose , tie , team_id , season_year , team_name , points) as 
            (
                SELECT *,wins*2+tie*1 as points FROM 
            (
                SELECT SUM(CASE WHEN match.team1=team.team_id or match.team2=team.team_id THEN 1 ELSE 0 END) as nmatch,
                SUM(CASE WHEN match.match_winner=team.team_id and (match.win_type!='tie' or match.win_type!='nr') THEN 1 ELSE 0 END) as wins,
                SUM(CASE WHEN match.team1+match.team2-match.match_winner=team.team_id and (match.win_type!='tie' or match.win_type!='nr') THEN 1 ELSE 0 END) as lose,
                SUM(CASE WHEN (match.team1=team.team_id or match.team2=team.team_id) and (match.win_type='tie' or match.win_type='nr') THEN 1 ELSE 0 END) as tie,
                team_id,season_year,team_name
                FROM match 
                NATURAL JOIN team 
                GROUP BY season_year,team_id
            ) as temp
            WHERE nmatch>0
            ORDER BY season_year,points DESC),
            
            newt(match_id , innings_no, runs, overs , team_id) as (
                select match_id,innings_no, sum(runs) as runs, sum(overs) as overs, team_id from (select match_id , innings_no, team_id , sum(runs_scored + extra_runs) as runs ,max(over_id)as overs from  (select player_match.match_id , team_id ,innings_no, runs_scored , extra_runs , out_type ,over_id from ball_by_ball , player_match  where player_match.match_id = ball_by_ball.match_id and striker = player_id) as v group by match_id , innings_no,team_id order by match_id , innings_no ) as z group by team_id , match_id ,innings_no
                order by match_id, innings_no
            ),
            nr(season_year, team_id , nrr) as 
            (select season_year,team_id,SUM(t1r/t1o - t2r/t2o) as nrr 
            from (select t1.match_id,t1.runs as t1r,t1.overs as t1o,t2.runs as t2r,t2.overs as t2o,t1.team_id from newt as t1 , newt as t2 where t1.match_id = t2.match_id and t1.innings_no != t2.innings_no) as x
            join match on match.match_id= x.match_id 
            group by season_year,team_id
            order by season_year,nrr DESC
            )
            select nmatch , wins , lose , tie , p.season_year , p.team_id , p.team_name , nrr , points from Point as p,(select team_name , nr.team_id , season_year , nrr from nr,team where team.team_id = nr.team_id order by season_year , nrr desc) as mm where mm.season_year = p.season_year and mm.team_id = p.team_id and p.season_year = $1 order by points desc , nrr desc
            `,[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/venue',async (req ,res) =>{
    try {
        const allt1 = await pool.query("select venue_id,venue_name from venue")
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/venue/:id1',async (req ,res) =>{
    try {
        const id1 = req.params.id1;
        const allt1 = await pool.query("select * from venue where venue_id = $1",[id1])
        res.json(allt1.rows);

        
    } catch (error) {
        console.error(error.message);
    }
});
app.get('/venue_details/:id1',async (req ,res) =>{
    try {
        const id1 = req.params.id1;
        const allt1 = await pool.query(`with venues(venue_id , matches) as (
	select venue_id , count(*) as matches from match group by venue_id order by venue_id
	),
    max_min(max , min , venue_id ) as (
    select max(runs), min(runs) , venue_id  from (select match_id , innings_no , runs ,m1.venue_id , matches from (select match_id , innings_no , sum(extra_runs+runs_scored) as runs , venue_id  from (select runs_scored , extra_runs , m.match_id , m.venue_id, b.innings_no from ball_by_ball as b, match as m where m.match_id = b.match_id order by m.match_id) as z group by match_id , innings_no , venue_id order by match_id) as m1 , venues where venues.venue_id = m1.venue_id) as m2 group by  venue_id  order by venue_id
    ),
    final0(venue_id , venue_name , city_name , country_name , capacity , max , min , matches ) as (
    select  venue.venue_id , venue.venue_name , city_name , country_name , capacity , max , min , matches from max_min , venue , venues where max_min.venue_id = venue.venue_id and venues.venue_id = venue.venue_id
    ),
    chase(max_chase , venue_id) as (
    select max(runs) as max,  venue_id  from (select match_id , innings_no , runs ,m1.venue_id , matches from (select match_id , innings_no , sum(extra_runs+runs_scored) as runs , venue_id  from (select runs_scored , extra_runs , m.match_id , m.venue_id, b.innings_no from ball_by_ball as b, match as m where m.match_id = b.match_id order by m.match_id) as z group by match_id , innings_no , venue_id order by match_id) as m1 , venues where venues.venue_id = m1.venue_id) as m2 where innings_no = 2 group by  venue_id  order by venue_id
    )
    select * from final0 , chase where chase.venue_id = final0.venue_id and chase.venue_id = $1`,[id1])
res.json(allt1.rows);


} catch (error) {
console.error(error.message);
}
});

app.get('/venue_pie/:id1',async (req ,res) =>{
    try {
        const id1 = req.params.id1;
        const allt1 = await pool.query(`with mat(match_id , innings_no , total  ) as (
	select p.match_id , innings_no , total , venue_id from (select match_id , innings_no , sum(runs_scored + extra_runs) as total  from ball_by_ball group by match_id , innings_no  order by match_id) as p , match where p.match_id = match.match_id 
	),
	mat1(match_id , innings_no , total1 , venue_id ) as (
	select *  from  mat where   innings_no =1),
	mat2(match_id , innings_no , total2 , venue_id ) as (
		select * from mat where innings_no = 2)
	select count(case when total1>total2 then 1 end) as first_batting , count(case when total1<total2 then 1 end) as second_batting , count(*) as total ,venue_id  from (select m1.match_id , m1.innings_no , m2.innings_no , total1 , total2 , m1.venue_id from mat1 as m1 , mat2 as m2 where m1.match_id = m2.match_id) as z where venue_id = $1 group by venue_id`,[id1])
res.json(allt1.rows);


} catch (error) {
console.error(error.message);
}
});


app.get('/venue_graph/:id1',async (req ,res) =>{
    try {
        const id1 = req.params.id1;
        const allt1 = await pool.query("select venue_id,season_year , avg(total) from (select p.match_id ,season_year, innings_no , total , venue_id from (select match_id , innings_no , sum(runs_scored + extra_runs) as total  from ball_by_ball group by match_id , innings_no  order by match_id) as p , match where p.match_id = match.match_id and innings_no = 1 ) as mm where venue_id = $1 group by season_year,venue_id",[id1])
        res.json(allt1.rows);
        
        
        } catch (error) {
        console.error(error.message);
        }
        });

app.listen(3000,(req,res) => {
    console.log("SERver is Running");
});