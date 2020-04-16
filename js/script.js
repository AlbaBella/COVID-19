jQuery(document).ready(function(){

    var url='https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=';
    var x = document.getElementById("usa");

    axios.get(url).then(function(response){
        displayCountry(response);

        $('a').each(function(index, link){
            var country=response.data.data.rows[index+1].country;
            //sorting ...
            
            $(link).html(country);

            $(link).on('click',function(){
                axios.get(url+country).then(function(response){
                    displayCountry(response);
                    
                    if (country==='USA'){
                        
                        displayState();
                        
                    } 
                    x.style.display="none";
                })                
            })
        })
    })
    
    function displayState(){
        
        var url='https://covidtracking.com/api/states';
        

        axios.get(url).then(function(response){
            
            var usaHTML='<a href="#usa"> Check all the states</a>';
            $('#usainfo').html(usaHTML);
            var y =document.getElementById("usainfo");
            y.style.display = "flex";

            
            $('#usainfo').on('click',function(){
                y.style.display = "none";

                x.style.display="flex";
                               
                var info=response.data;
                $('td').each(function(index, state, cases, recovered,death){
                    var states=info[index].state;
                    var Cases=info[index].positive;
                                   
                    var recover=info[index].recovered;
                    var deaths=info[index].death;
    
                    $('.state'+index).html(states);
                    $('.cases'+index).html(Cases);
                    $('.recovered'+index).html(recover);
                    $('.death'+index).html(deaths);
                    
                })      
               
            })
        })          
    }

    function displayCountry(response){

        var time=response.data.data.last_update;
        var info=response.data.data.rows[0];
        var total=info.total_cases;
        var newcase=info.new_cases;
        var deaths=info.total_deaths;
        var newdeaths=info.new_deaths;
        var recovered=info.total_recovered;
        var critical=info.serious_critical;
        var flag=info.flag;

        var casesHTML='<h1 class="text-center text-danger font-weight-bolder"> '+total+'</h1>';
        casesHTML+='<h3 class="text-center"> people are infected with the COVID-19 as of ' +time+ ' <h6 class="text-right">(Universal Time Coordinated)</h6> </h3>';
        $('.world').html(casesHTML);
      
        var newcaseHTML= '<h2 class="text-danger font-weight-bold"> '+newcase+ '</h2>';
        newcaseHTML+= '<h4> people are infected <strong>JUST</strong> today!</h4>';
        $('.newcase').html(newcaseHTML);

        var deathsHTML='<h2 class="text-danger font-weight-bold"> '+deaths+ '</h2>';
        deathsHTML+= '<h4> people are dead!</h4>';
        $('.deaths').html(deathsHTML);

        var newdeathsHTML='<h2 class="text-danger font-weight-bold"> '+newdeaths+ '</h2>';
        newdeathsHTML+= '<h4> people died <strong>JUST</strong> today!</h4>';
        $('.newdeaths').html(newdeathsHTML);

        var recoveredHTML='<h2 class="text-danger font-weight-bold"> '+recovered+ '</h2>';
        recoveredHTML+= '<h4> people are totally recovered! </h4>';
        $('.recovered').html(recoveredHTML);

        var criticalHTML='<h2 class="text-danger font-weight-bold"> '+critical+ '</h2>';
        criticalHTML+= '<h4> people are in a critical condition! </h4>';
        $('.critical').html(criticalHTML);
      
        var flagHTML='<img  src="' +flag+ '" class="rounded" style= "width:100%" alt="flag">';
        $('.flag').html(flagHTML);

        }

});