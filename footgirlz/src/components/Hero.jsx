import { ArrowRightIcon, Loader2 } from 'lucide-react'
import { getMatchValue, getTeamLogo } from '../services/footballApi'
import { heroStyles as s } from '../assets/dummyStyles'

const HERO_VIDEO_URL = "https://"


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
    const matchDate = getMatchValue(match, ['date', 'matchDate', 'fixture.date'], 'Upcoming');

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
    
function Stat({ value, label, loading }) {
        return (
            <div className='min-w-0'>
                <p className={s.statValue}>
                    {loading ? <Loader2 className="size-8 animate-spin"/> : value}
                </p>
                <p className={s.statLabel}>{label}</p>
            </div>
        )
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
                        <Stat value="8.4" label="Match Rating" loading={loading} />
                        <Stat value="$9.57M" label="Market Value" loading={loading} />
                        <Stat value="97%" label="Pass Accuracy" loading={loading} />
                    </aside>
                    <div className={s.headingWrapper}>
                        <h1 className={s.heading}>Welcome to FootGirlz</h1>
                        <p className={s.subheading}>Your ultimate destination for football news and updates</p>
                    </div>

                    <div className={s.rightPanel}>
                        {displayMatches[0] ? (
                            <div className={s.featuredMatchCard}>
                            <div className={s.featuredMatchHeader}>
                                <p className={s.featuredMatchHeaderText}>
                                    Featured
                                    <br/>
                                    Match
                                </p>
                            <button className={s.featuredMatchButton}>
                                <ArrowRightIcon size={17} />
                            </button>
                            </div>
                            <MatchRow match={displayMatches[0]} featured />
                            </div>
                        ) : (
                            <div className={s.emptyState}>
                                {loading ? <Loader2 className="mx-auto size-6 animate-spin"/> : "No upcoming matches"}
                            </div>
                        )}
                        {displayMatches.length > 1 && (
                            <div className={s.moreMatchesRow}>
                                <p className={s.moreMatchesButton}>
                                    More
                                    <br/>
                                    Matches
                                </p>
                                <button className={s.moreMatchesButton}>
                                    <ArrowRightIcon size={14} />
                                </button>
                            </div>
                        )}
                        <div className={s.remainingMatchesGrid}>
                            {displayMatches.slice(1).map((match, index) => (
                                <MatchRow key={ match.id || index } match={ match } />
                            ))}
                        </div>



                    </div>
                </div>
            </div>
        </section>
    );
}