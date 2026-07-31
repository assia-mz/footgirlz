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

    return (
        <div className={featured ? s.matchRowFeatured : s.matchRowDefault}>
            {!featured && (
                <div className={s.matchDate}>
                    {matchDate}
                </div>
            )}
            <div className='flex items-center justify-between gap-2'>
                   <div className={s.teamColumn}>
                        <RealTeambadge logo={homeLogo} name={home} featured={featured} />
                        <span className={`${s.teamNameBase} ${featured ? s.teamNameFeatured : s.teamNameDefault}`}>
                            {home}
                        </span>
                   </div>
                   <span className={`${s.vsBase} ${featured ? s.vsFeatured : s.vsDefault}`}>
                       VS
                    </span>
                   <div className={s.teamColumn}>
                       <RealTeambadge logo={awayLogo} name={away} featured={featured} />
                        <span className={`${s.teamNameBase} ${featured ? s.teamNameFeatured : s.teamNameDefault}`}>
                            {away}
                        </span>
                   </div>
                   {!featured && (
                        <button className={s.watchButton}>
                            <ArrowRightIcon size={14} />
                        </button>
                   )}
            </div>
        </div>
    );
}


export default function Hero({ matches = [], loading }) {
    const displayMatches = matches.length ? matches.slice(0, 3) : [];

    return (
        <section id="top" className={s.heroSection}>
            <div className={s.innerBg}>
                <video
                    aria-hidden="true"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={s.heroVideo}
                >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                </video>
                <div className={s.overlayGradient}/>
                <div className={s.gridContainer}>
                    <aside className={s.statsAside}>
            </div>
        </section>
    );