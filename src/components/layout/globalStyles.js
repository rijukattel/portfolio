import { createGlobalStyle } from 'styled-components';
import colors from '../../static/colors.json';

const {
  primaryColor,
  primaryDark,
  primaryLight,
  headingsColor,
  baseTextColor,
  baseTextColorDark,
  disabledColor,
  dividerColor,
  markColor,
} = colors;

const GlobalStyles = createGlobalStyle`

    ::selection {
    color: ${primaryLight};
    background: ${primaryColor};
    }

   
    :root {
        
        /* Colors */
        --primaryColor: ${primaryColor};
        --primaryDark: ${primaryDark};
        --primaryLight: ${primaryLight};
        --headingsColor: ${headingsColor};
        --baseTextColor: ${baseTextColor};
        --baseTextColorDark: ${baseTextColorDark};
        --disabledColor: ${disabledColor};
        --dividerColor: ${dividerColor};
        --markColor: ${markColor};
        
        /* Containers */
        --globalContainer: 1100px;
        --globalPaddingLr: 1.875rem;
        --globalPaddingTb: 60px;

        /* Radius */
        --defaultRadius: 10px;

        /* Gaps */
        --gapSmall: 10px; // .625rem
        --gapRegular: 20px; // 1.25rem
        --gapL: 30px;
        --gapXL: 60px; // 3.75rem

        /* Typography */
        --defaultStack: -apple-system,'Noto Sans'; 
        /* --defaultStack: -apple-system, BlinkMacSystemFont, "Helvetica", "Helvetica Neue", "Arial", sans-serif; */

        --headingXXL: 3.25rem; // 52px
        --headingXL: 2.625rem; // 42px
        --headingL: 2rem; // 32px
        --headingM: 1.625rem; // 26px
        --headingS: 1.375rem; // 24px
        --baseXL: 1.25rem; // 20px
        --baseL: 1.125rem; // 18px
        --baseM: 1rem; // 16px
        --baseS: .815rem; // 14px

        --baseMMobile: calc(var(--baseM) * 1.1);
        --baseSMobile: calc(var(--baseS) * 1.1);

        --headingsHeight: 1.1;
        --paragraphHeight: 1.5;

    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 16px;
        margin: 0;
        padding: 0;
        line-height: var(--paragraphHeight);
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: var(--defaultStack);
        font-weight: 500;
        color: var(--baseTextColor);
        margin: 0;
        padding: 0;
    }

    h1,h2,h3{
        font-family: Raleway;

    }

    h1, h2, h3, p {
        margin: 0;
        padding: 0;
    }

    ul, ol {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    button {
        cursor: pointer;
        margin: 0;
        padding: 0;
        appearance: none;
        border: none;
        background: none;
    }

    button,
    input,
    select,
    textarea {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        line-height: 1.15; /* 1 */
        margin: 0; /* 2 */
    }

    a { 
        text-decoration: none;
        background-color: transparent;
    }

    b, strong {
        font-weight: 700;
    }

    address, time {
        font-style: normal;
    }

    /* Classes */
    .activeClassLink {
        color: var(--primaryColor) !important;
    }

    .classicButton {
        background: var(--primaryColor);
        color: white;
        transition: background .2s ease-in-out;
        border-radius: 10px;
        white-space: nowrap;
        font-weight: 700;
        font-family: var(--defaultStack);
        font-size: var(--baseM);
        display: flex;
        align-items: center;
        justify-content: center;
        width: min-content;
        height: min-content;
        padding: .6em 1em;

        &:hover {
            background: var(--primaryDark);
        }

        @media screen and (max-width: 768px) {
            font-size: var(--baseMMobile);
        }
    }

    .classicButtonOutline {
        border: 2px solid var(--primaryColor);
        background: transparent;
        color: var(--primaryColor);
        padding: .4em 1em;
        transition: background .2s ease-in-out, color .2s ease-in-out;

        &:hover {
            background: var(--primaryColor);
            color: white;
        }
    }

    /* form-contact us */
.card-form {
	padding: 2rem 1rem 0;
}
// iOS Reset 
input {
	appearance: none;
	border-radius: 0;
}

.input {
	display: flex;
	flex-direction: column-reverse;
	position: relative;
	padding-top: 1.5rem;
	&+.input {
		margin-top: 1.5rem;
	}
}

.input-label {
	color: #8597a3;
	position: absolute;
	top: 1.5rem;
	transition: .25s ease;
}

.input-field {
	border: 0;
	z-index: 1;
	background-color: transparent;
	border-bottom: 2px solid #eee; 
	font: inherit;
	font-size: 1.125rem;
	padding: .25rem 0;
	&:focus, &:valid {
		outline: 0;
		border-bottom-color: #6658d3;
		&+.input-label {
			color: #6658d3;
			transform: translateY(-1.5rem);
		}
	}
}

.action {
	margin-top: 2rem;
}

.action-button {
	font: inherit;
	font-size: 1.25rem;
	padding: 1em;
	width: 100%;
	font-weight: 500;
	background-color: #6658d3;
	border-radius: 6px;
	color: #FFF;
	border: 0;
	&:focus {
		outline: 0;
	}
}

.card-info {
	padding: 1rem 1rem;
	text-align: center;
	font-size: .875rem;
	color: #8597a3;
	a {
		display: block;
		color: #6658d3;
		text-decoration: none;
	}
}




    `;

export default GlobalStyles;
