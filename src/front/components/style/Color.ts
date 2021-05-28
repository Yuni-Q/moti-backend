import { css } from "styled-components";

export const W000 = '#fff';

export const CG100 = '#F8F9FA';
export const CG200 = '#ECEEF2';
export const CG300 = '#D7DBE6';
export const CG400 = '#BBC0CD';
export const CG500 = '#8E929F';
export const CG600 = '#666A75';
export const CG700 = '#42454F';
export const CG800 = '#212329';

export const B100 = '#F2F7FF';
export const B200 = '#E0EDFD';
export const B400 = '#A6CCFF';
export const B600 = '#1A7CFF';
export const B700 = '#0F67DD';

export const M500 = '#2AC1BC';
export const M600 = '#11B4B2';

export const G100 = '#E0F5E6';
export const G500 = '#00B031';

export const P100 = '#E0F5E6';
export const P500 = '#00B031';

export const R200 = '#F6E7E8';
export const R500 = '#F45452';
export const R600 = '#F52926';

export const O500 = '#FF8400';

export const Y500 = '#FFC600';

export const white = W000;
export const black = '#000';

export const textDefault = CG800;
export const primaryColor = B600;
export const dangerColor = R500;
export const subColor = CG500;
export const disabledTxtColor = CG400;
export const borderSeparateColor = CG200;
export const warningColor = O500;
export const errorColor = R500;

const Color = css`
	a, .link {
		text-decoration: none;
		color: ${B600};
		cursor: pointer;

		&.hover:hover {
			text-decoration: underline;
		}
	}

	:disabled, .disabled {
		color: ${CG400};
	}

	.text-default {
		color: ${textDefault};
		&:hover,
		&:focus {
			color: darken(${textDefault}, 15%) !important;
		}
	}
	.text-light {
		color: ${white};
		&:hover,
		&:focus {
			color: darken(${white}, 15%) !important;
		}
	}
	.text-muted {
		color: ${CG400};
		&:hover,
		&:focus {
			color: darken(${CG400}, 15%) !important;
		}
	}
	.text-danger {
		color: ${R500};
		&:hover,
		&:focus {
			color: darken(${R500}, 15%) !important;
		}
	}
	.text-warning {
		color: ${O500};
		&:hover,
		&:focus {
			color: darken(${O500}, 15%) !important;
		}
	}
	.text-active {
		color: ${B600};
		&:hover,
		&:focus {
			color: darken(${B600}, 15%) !important;
		}
	}
	.text-progress {
		color: ${G500};
		&:hover,
		&:focus {
			color: darken(${G500}, 15%) !important;
		}
	}
	.text-sub {
		color: ${subColor};
		&:hover,
		&:focus {
			color: darken(${subColor}, 15%) !important;
		}
	}
	.text-disabled {
		color: ${disabledTxtColor};
		&:hover,
		&:focus {
			color: darken(${disabledTxtColor}, 15%) !important;
		}
	}
`;

export default Color;
