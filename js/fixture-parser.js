String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
}
;

var FixtureParser = function() {
    var getLocalKickOffTime = function(date, utcTime) {
        if (utcTime.indexOf(":") > -1) {
            var utcKOTime = moment.utc(moment.utc(date + "T" + utcTime).format('YYYY-MM-DD HH:mm:ss')).toDate();
            localKOTime = moment().format("HH:mm");
        } else {
            localKOTime = utcTime;
        }
        return utcTime;
    };

    var preprocessFixtures = function(fixtures) {
        $.each(fixtures, function(index, fixture) {
            if (fixture.kickOff.date < '2018-07-01') {
                if (fixture.kickOff.status === 'FULL_TIME') {
                    fixture.score.homeGoals = 2;
                    fixture.score.awayGoals = 1;
                }
            }
        });
        return fixtures;
    };
    
    var getFixtureAsHTMLElement = function(fixture, index) {
        var listElement = '<tr class="fixture">';
        listElement = listElement + '<td class="competition"><div class="flag flag-' + fixture.country + '"></div>' + fixture.competition + '</td>';
        listElement = listElement + '<td class="kickOffDate" ><small>' + getLocalKickOffTime(fixture.kickOff.date, fixture.kickOff.time) + '</small></td>';
        listElement = listElement + '<td class="home team"><strong>' + fixture.homeTeam + '</strong></td>';
        listElement = listElement + '<td class="score">' + fixture.score.homeGoals + ':' + fixture.score.awayGoals + '</td>';
        listElement = listElement + '<td class="away team"><strong>' + fixture.awayTeam + '</strong></td>';
        listElement = listElement + '</tr>';
        return listElement;
    };

    return {
        parseFixtures: function(fixtures) {
            var localString = FixtureFinder.localizeString("fixtures");
            $('.fixtures .fixture').remove();
            $('.fixtures .numberOfFixtures').text(fixtures.length + ' ' + localString);
            fixtures = preprocessFixtures(fixtures);
            $.each(fixtures, function(index, fixture) {
                $('.fixtures .table').append(getFixtureAsHTMLElement(fixture, index));
            });

        }
    }
}();
