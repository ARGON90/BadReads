import { NavLink } from "react-router-dom"
import "./CSS/Reviews.css"

const NotFound = () => {
    return (
        <>
            <div className='alex_flex_column alex_align_center alex_pad_top_35'>
                <div className='alex_review_page_title alex_pad_bottom_10'>We couldn't find the page you were looking for...</div>
                <img className='alex-404-image' src='https://ih1.redbubble.net/image.9463780.9100/flat,1000x1000,075,f.jpg' alt='page not found' />
                <div className='alex_flex_row alex_pad_top_10 '>
                    <div className='alex_merriweather_300 alex_font_16 alex_bold alex_margin_right_3'>Are you lost? Click</div>
                    <NavLink className={'alex_text_deco_none'} to='/'>
                        <div className='alex_merriweather_300 alex_font_16 alex_bold alex_font_green alex_margin_right_3'>here</div>
                    </NavLink>
                    <div className='alex_merriweather_300 alex_font_16 alex_bold '>to go home.</div>

                </div>
            </div>
        </>
    )
}

export default NotFound;
