$(function()
{
    var playerTrack = $("#player-track");
    var bgArtwork = $('#bg-artwork');
    var bgArtworkUrl;
    var albumName = $('#album-name');
    var trackName = $('#track-name');
    var albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        playRepeatButton = $("#play-repeat"),
        openMenu = $('#play-menu'),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null, tFlag = false;
    
    var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
    
    var songs = [
     {
        artist: "Dig Didzay",
        name: "Nếu Anh Đi (Cover)",
        url: "Musics/NeuAnhDi.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thái Đinh",
        name: "Em Có Còn Dùng Số Này Không ",
        url: "Musics/em_co_con_dung_so_nay_khong_thai_dinh_official_lyrics_2019_687183.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thái Đinh",
        name: "Phố Không Em ",
        url: "Musics/PhoKhongEm-ThaiDinh-4475322.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thế Bảo",
        name: " Về Phía Mưa ",
        url: "Musics/VePhiaMua-TheBao-4563628.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Chillies",
        name: " Và Thế Là Hết ",
        url: "Musics/VaTheLaHet-Chillies-5833412.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thái Đinh",
        name: " Những Ngày Vắng Em ",
        url: "Musics/NhungNgayVangEm-ThaiDinhNamKun-4285248.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thái Đinh",
        name: " Đi Qua Mùa Hạ ",
        url: "Musics/DiQuaMuaHa-ThaiDinh-6037082.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Long Phạm",
        name: " Gió Vẫn Hát ",
        url: "Musics/gio_van_hat_long_pham_mv_lyrics_hd_186249.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thái Đinh",
        name: " Đông Và Anh ",
        url: "Musics/dong_va_anh_thai_dinh_official_lyrics_2017_350439.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thế Bảo",
        name: " Cafe, Thuốc Lá Và Những Ngày Vui ",
        url: "Musics/CafeThuocLaVaNhungNgayVui-TheBao-4938467.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Đức Phúc",
        name: " Ánh Nắng Của Anh ",
        url: "Musics/anh_nang_cua_anh_cho_em_den_ngay_mai_ost.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Thái Đinh",
        name: " Là Em ",
        url: "Musics/LaEm-ThaiDinh-5422172.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Trung Quân",
        name: " Thả Vào Mưa ",
        url: "Musics/y2mate.com - [Lyrics] Thả vào mưa - Trung Quân FHD_P1W0AMVTeXQ.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Tino",
        name: " Ừ Có Anh Đây ",
        url: "Musics/y2mate.com - [Lyrics] Ừ Có Anh Đây - Tino_qar25VLWgdU.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Andiez",
        name: " 1 Phút ",
        url: "Musics/y2mate.com - 1 Phút - Andiez_dLQe4qEfVJw.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Pháo x Masew",
        name: " 2 Phút Hơn ",
        url: "Musics/y2mate.com - 2 Phút Hơn - Pháo x Masew_MxXKfq86E0I.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Chi Dân",
        name: " 1234 ",
        url: "Musics/y2mate.com - 1234 _ OFFICIAL MV FULL _ CHI DÂN _MV HD_RneMEagAkcE.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Soobin Hoàng Sơn",
        name: " Anh Đã Quen Với Cô Đơn ",
        url: "Musics/y2mate.com - Anh Đã Quen Với Cô Đơn - Soobin Hoàng Sơn _ Official Music Video 4K_X7sSE3yCNLI.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Sơn Tùng M-TP",
        name: " Anh Sai Rồi ",
        url: "Musics/y2mate.com - Anh sai rồi ‣ SƠN TÙNG M-TP「Lyric Video」_kCz2-rIHALw.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "huyR",
        name: " Anh Thanh Niên ",
        url: "Musics/y2mate.com - Anh Thanh Niên - HuyR _ OFFICIAL MV_HPL74s4VPdk.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Bigdaddy x Emily",
        name: " Mượn Rượu Tỏa Tình ",
        url: "Musics/y2mate.com - BIGDADDY x EMILY - Mượn Rượu Tỏ Tình (Official MV)_aGUQsb31TEw.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Erik ft Mr. Siro",
        name: " Chạm Đáy Nổi Đâu ",
        url: "Musics/y2mate.com - CHẠM ĐÁY NỔI ĐAU - ERIK ft Mr. Siro - Lyrics_s_3uvp7NtKA.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Trung Quân Idol",
        name: " Chiều Nay Không Có Mưa Bay ",
        url: "Musics/y2mate.com - Chiều nay không có mưa bay - Trung Quân Idol (Lyrics)_xq9KpBCFuXs.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Nguyễn Đình Vũ",
        name: " Chúng Ta Dừng Lại Ở Đây Thôi ",
        url: "Musics/y2mate.com - Chúng Ta Dừng Lại Ở Đây Thôi - Nguyễn Đình Vũ (Lyric Video)_dESRXRg0wCA.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Chi Dân",
        name: " Điều Anh Biết  ",
        url: "Musics/y2mate.com - Điều Anh Biết _ Chi Dân MV OFFICIAL_ocjUUfk9k1Y.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Vũ",
        name: " Đông Kiếm Em ",
        url: "Musics/y2mate.com - ĐÔNG KIẾM EM  Vũ. (Original)_NLBTbCfR-Fg.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Sơn Tùng M-TP",
        name: " Em Đừng Đi ",
        url: "Musics/y2mate.com - Em Đừng Đi   Sơn Tùng MTP   MV Lyrics HD_-Qmd0_jO5fM.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Hương Tràm",
        name: " Em Gái Mưa  ",
        url: "Musics/y2mate.com - Em Gái Mưa [Lyrics] Hương Tràm_GwZ2ydvU_kQ.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "B Ray x Masew (Ft AMEE)",
        name: " Ex's Hate Me ",
        url: "Musics/y2mate.com - Ex's Hate Me - B Ray x Masew (Ft AMEE) _ Official MV_95ahbau-rJk.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Long Nón Lá x Masew",
        name: " Hành Lang Cũ  ",
        url: "Musics/y2mate.com - Hành Lang Cũ (Hạ Nhớ) - Long Nón Lá x Masew_kyck8iUOTKU.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: " Phan Mạnh Quỳnh",
        name: " Hãy Ra Khỏi Người Đó Đi  ",
        url: "Musics/y2mate.com - Hãy Ra Khỏi Người Đó Đi - Phan Mạnh Quỳnh [Video Lyric HD]_5CJLUnbfOzY.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Đức Phúc",
        name: "  Hết Thương Cạn Nhớ  ",
        url: "Musics/y2mate.com - Hết Thương Cạn Nhớ - Đức Phúc [LYRIC VIDEO] #HTCN_xM1lw0d_5D4.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Hương Tràm",
        name: " Duyên Mình Lỡ  ",
        url: "Musics/y2mate.com - Hương Tràm _ Duyên Mình Lỡ (#DML) Phiên Bản Hoạt Hình_XQ9ZMuqQMAg",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Nguyễn Đình Vũ",
        name: " Lỡ Thương Một Người   ",
        url: "Musics/y2mate.com - Lỡ Thương Một Người - Nguyễn Đình Vũ [LYRIC VIDEO] #LTMN_lbgXp5qen2g.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Kha",
        name: " Lời Yêu Ngây Dại  ",
        url: "Musics/y2mate.com - Lời Yêu Ngây Dại - Kha_UBv-GcD3jHE.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Dig Didzay",
        name: " Nếu Em Đi (Cover)  ",
        url: "Musics/y2mate.com - Lyrics __ Nếu Em Đi (Cover) - DIG DIDZAY_tbQa1arl3_w.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Lou Hoàng",
        name: " Mình Là Gì Của Nhau  ",
        url: "Musics/y2mate.com - Mình là gì của nhau _ Lou Hoàng _ Official MV 4K _ Nhạc trẻ hay mới nhất_8GDkIxoADN8.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Sơn Tùng M-TP",
        name: " Nắng Ấm Xa Dần (ONIONN REMIX)  ",
        url: "Musics/y2mate.com - NẮNG ẤM XA DẦN (ONIONN REMIX) _ SƠN TÙNG M-TP _ Official Music_ErhGuwNgrmw.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Only C ft. Lou Hoàng",
        name: " Não Cá Vàng  ",
        url: "Musics/y2mate.com - NÃO CÁ VÀNG _ ONLY C ft. LOU HOÀNG _ OFFICIAL MV 2017_r3iKrM6hImQ.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Osad X Khánh Vy",
        name: " Người Âm Phủ  ",
        url: "Musics/y2mate.com - NGƯỜI ÂM PHỦ - OSAD X KHÁNH VY _ OFFICIAL MV EDM_mDZs3nQwb-0.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Nguyễn Đình Vũ",
        name: " Người Con Trai Ấy  ",
        url: "Musics/y2mate.com - Người Con Trai Ấy - Nguyễn Đình Vũ_Ij-2Z4KlF7E.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Sơn Tùng M-TP",
        name: " Âm Thầm Bên Em  ",
        url: "Musics/y2mate.com - OFFICIAL MP3  Âm Thầm Bên Em   Sơn Tùng M TP_2jfpQ_XWiUg.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Soobin Hoàng Sơn",
        name: " Phía Sau Một Cô Gái  ",
        url: "Musics/y2mate.com - PHÍA SAU MỘT CÔ GÁI - Soobin Hoàng Sơn ( OFFICIAL Lyric Video )_j__Q13iAxNk.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Phương Vy",
        name: " Sài Gòn Đẹp Lắm ",
        url: "Musics/y2mate.com - SÀI GÒN ĐẸP LẮM - Phương Vy -TRAMOM REMIX_egf7uIq6SvQ.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Soobin Hoàng Sơn ",
        name: " Xin Đừng Lặng Im  ",
        url: "Musics/y2mate.com - SOOBIN HOÀNG SƠN - XIN ĐỪNG LẶNG IM _ Official Audio Lyrics _ Nhạc Trẻ Hay Nhất_DGixjx5vpiM.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Andiez x Biti's Hunter",
        name: " Suýt Nữa Thì  ",
        url: "Musics/y2mate.com - SUÝT NỮA THÌ _ OFFICIAL OST _ CHUYẾN ĐI CỦA THANH XUÂN _ ANDIEZ x BITI'S HUNTER _ LYRIC VIDEO_cUmpJ2zwfVU.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Will x Han Sara",
        name: " Tận Cùng Nỗi Nhớ  ",
        url: "Musics/y2mate.com - Tận Cùng Nỗi Nhớ (TCNN) _ Will x Han Sara _ Official Music Video_UOpE-hRFPCo.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Sơn Tùng M-TP",
        name: " Thái Bình Mồ Hôi Rơi  ",
        url: "Musics/y2mate.com - Thái Bình Mồ Hôi Rơi - Sơn Tùng M-TP_5Jm9g0YdGDU.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Justatee x Phương Ly",
        name: " Thằng Điên ",
        url: "Musics/y2mate.com - THẰNG ĐIÊN _ JUSTATEE x PHƯƠNG LY _ OFFICIAL MV_HXkh7EOqcQ4.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Hà Anh Tuấn",
        name: " Tháng Tư Là Lời Nối Dối Của Em  ",
        url: "Musics/y2mate.com - Tháng Tư Là Lời Nối Dối Của Em [Official Lyric Video] - Hà Anh Tuấn_Sf9_daKZrnY.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Trịnh Đình Quang",
        name: " Thế Giới Ảo Tình Yêu Thật Remake ",
        url: "Musics/y2mate.com - Thế Giới Ảo Tình Yêu Thật Remake [LYRIC VIDEO] #TGATYT_z8nsL2YYv7I.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Reddy",
        name: " Thì Thôi  ",
        url: "Musics/y2mate.com - Thì Thôi - Reddy _ MV Lyrics HD_Eb8fj-jstNo.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Reddy ",
        name: " Vài Giây Nữa Thôi  ",
        url: "Musics/y2mate.com - Vài Giây Nữa Thôi - Reddy _ MV Lyrics HD_vvmFvoyXPyE.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Lou Hoàng",
        name: " Yêu Em Dại Khờ  ",
        url: "Musics/y2mate.com - YÊU EM DẠI KHỜ _ LOU HOÀNG _ OFFICIAL MV_KyXKGurjX_4.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    {
        artist: "Binz",
        name: " Sofar ",
        url: "Musics/y2mate.com - Vì ta chưa hề đậm sâu_U7xAqKm0x4s.mp3",
        picture: "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg"
    },
    
   ];
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
     songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    // toggle repeat
    function playRepeat()
    {
        isRepeat = !isRepeat;
        audio.loop = isRepeat;
        toggleEnable(isRepeat, playRepeatButton);
    }

    function toggleEnable(condition, element)
    {
        if (condition)
            element.addClass('isEnabled');
        else
            element.removeClass('isEnabled');
    }
    
    function toggleMenu()
    {
        isOpen = !isOpen;
        toggleEnable(isOpen, openMenu);
    }

    function showHover(event)
    {
        seekBarPos = sArea.offset(); 
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());
        
        sHover.width(seekT);
        
        cM = seekLoc / 60;
        
        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
        
        if( (ctMinutes < 0) || (ctSeconds < 0) )
            return;
        
        if( (ctMinutes < 0) || (ctSeconds < 0) )
            return;
        
        if(ctMinutes < 10)
            ctMinutes = '0'+ctMinutes;
        if(ctSeconds < 10)
            ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
            insTime.text(ctMinutes+':'+ctSeconds);
            
        insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
        
    }

    function hideHover()
    {
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);       
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime()
    {
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
        
        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);
        
        playProgress = (audio.currentTime / audio.duration) * 100;
        
        if(curMinutes < 10)
            curMinutes = '0'+curMinutes;
        if(curSeconds < 10)
            curSeconds = '0'+curSeconds;
        
        if(durMinutes < 10)
            durMinutes = '0'+durMinutes;
        if(durSeconds < 10)
            durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
            tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
        seekBar.width(playProgress+'%');
        
        if( playProgress == 100 )
        {
            i.attr('class','fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1);
        }
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag, index = null)
    {
        if (index === null) {
            if( flag == 0 || flag == 1 ) {
                ++currIndex;
            } else if (flag === -1) {
                --currIndex;
            }
        } else {
            currIndex = index;
        }

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
            
            currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
            $('.song').removeClass('playingSong');
            $('#song' + currIndex).addClass('playingSong');
        }
        else
        {
            if (currIndex < 0) {
                currIndex = songs.length - 1;
            } else if (currIndex > songs.length - 1) {
                currIndex = 0;
            }
            selectTrack(2);
        }
    }

    function initPlayer()
    {   
        audio = new Audio();
        addSongList();
        selectTrack(0);
        
        audio.loop = false;
        isRepeat = false;
        isOpen = false;

        playPauseButton.on('click',playPause);
        
        sArea.mousemove(function(event){ showHover(event); });
        
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
        
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){
            selectTrack(-1);
        });
        playNextTrackButton.on('click',function(){
            selectTrack(1);
        });
        playRepeatButton.on('click', function(){
            playRepeat();
        });
        openMenu.on('click', function(){
            $("#list-song").fadeToggle(300);
            toggleMenu();
        });
    }
    
    function addSongList() {
        songs.forEach((song, index) => {
            const songTemplate = 
            `<div class="song" id="song${index}">
                <i class="fas fa-play"></i>
                <div class="info">
                    ${song.name} - ${song.artist}
                </div>
            </div>`

            $("#list-song").append(songTemplate);
            $('#song' + index).on('click', () => {
                selectTrack(0, index);
                playPause();
            });
        })
        
    }
    
    initPlayer();
});
