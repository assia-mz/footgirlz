import { ArrowRightIcon, Loader2 } from 'lucide-react'
import { getMatchValue } from '../services/footballApi'
import { heroStyles as s } from '../assests/dummyStyles'

const HERO_VIDEO_URL = 'https://'


const teamNamePaths = {
    home: ['home.name', 'homeTeam.name', 'teams.home.name', 'homeTeam', 'home'],
    away: ['away.name', 'awayTeam.name', 'teams.away.name', 'awayTeam', 'away'],
};

function RealTeambadge({ logo, name, featured }) {
    return (
        <div className={`${s.badgeBase} ${featured ? s.badgeFeatured : s.badgeDefault}`}>
            {logo ? (
                <img src={logo} alt={`${name} logo`} className={s.badgeLogo} />
            ) : (
                <span className={featured ? s.badgeFallbackFeatured : s.badgeFallbackDefault}>
                    {name.slice(0, 3).toUpperCase()}
                </span>
            )}
        </div>
    );
}

function MatchRow({ match, featured = false }) {
    if (!match) return null;
    const home = getMatchValue(match, teamNamePaths.home);
    const away = getMatchValue(match, teamNamePaths.away);
    const homeLogo = getTeamLogo(match, 'home');
    const awayLogo = getTeamLogo(match, 'away');
    const match date = getMatchValue(match, ['date', 'matchDate', 'fixture.date'], 'Upcoming');

    return 
}