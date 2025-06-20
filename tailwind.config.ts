
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Earth tones palette
				earth: {
					sand: '#E6D2B5',
					stone: '#BEB6A6',
					olive: '#8A8F7F',
					moss: '#5E6F64',
					forest: '#46594B',
					coffee: '#5D4E41',
					clay: '#BD8C7D',
					terracotta: '#C66E4E'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif']
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '0.6',
						transform: 'scale(1)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1.05)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'type-cursor': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'steam-rise': {
					'0%': { 
						transform: 'translateY(0) scale(1)',
						opacity: '0.7'
					},
					'100%': { 
						transform: 'translateY(-20px) scale(1.5)',
						opacity: '0'
					}
				},
				'ripple': {
					'0%': { 
						transform: 'scale(0)',
						opacity: '1'
					},
					'100%': { 
						transform: 'scale(4)',
						opacity: '0'
					}
				},
				'shimmer': {
					'0%': { 
						backgroundPosition: '-200% 0'
					},
					'100%': { 
						backgroundPosition: '200% 0'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(-5%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'spin-slow': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0.7' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(5px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				},
				'color-cycle': {
					'0%, 100%': { color: 'hsl(var(--accent))' },
					'33%': { color: '#C66E4E' },
					'66%': { color: '#46594B' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'float': 'float 4s ease-in-out infinite',
				'type-cursor': 'type-cursor 0.8s step-end infinite',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'steam-rise': 'steam-rise 2s ease-out infinite',
				'ripple': 'ripple 0.8s ease-out',
				'shimmer': 'shimmer 2s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite',
				'spin-slow': 'spin-slow 10s linear infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'scale-up': 'scale-up 0.3s ease-out forwards',
				'blur-in': 'blur-in 0.5s ease-out forwards',
				'color-cycle': 'color-cycle 5s infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-glass': 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
