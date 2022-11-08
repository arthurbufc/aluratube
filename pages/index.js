import React from "react"
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset"
import  Menu  from "../src/components/Menu"
import  { StyledTimeline }  from "../src/components/Timeline"

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("Angular");
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
                <Menu valorDoFiltro={ valorDoFiltro } setValorDoFiltro={ setValorDoFiltro } />
                <Header/>
                <Timeline searchValue={ valorDoFiltro } playlists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage


const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;    
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    `;
const StyledBanner = styled.div`
    background-color: blue;
    background-image: url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({searchValue, ...propriedades}) {

    const playlistsNames = Object.keys(propriedades.playlists);
    //Retorno por expressao
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName]
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalize = video.title.toLowerCase();
                                const searchValueNormalize = searchValue.toLowerCase();
                                return titleNormalize.includes(searchValueNormalize)
                            }).map((video) => {
                                return (
                                    <div>
                                        <a href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                            {video.title}
                                            </span>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                ) 
            })}  
        </StyledTimeline> 
    );
}