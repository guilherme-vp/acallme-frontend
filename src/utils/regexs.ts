export const emailRegex = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

export const cpfRegex = new RegExp(
	/^([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})$/
)

function patternFormatter(pattern: string, args: IncludeRequirement): string {
	return args === false
		? ''
		: args === true
		? `(${pattern})`
		: `(${pattern}{${(() => {
				const min = args?.min && args?.min > 0 ? args.min : 1
				const max = args?.max && args?.max > min ? args.max : ''
				return `${min},${max}`
		  })()}})`
}

type IncludeRequirement =
	| {
			min?: number
			max?: number
	  }
	| boolean

interface StringRequirementsArgs {
	minLength?: number
	maxLength?: number
	includeNumber?: IncludeRequirement
	includeUppercase?: IncludeRequirement
	includeLowercase?: IncludeRequirement
	includeSpecial?: IncludeRequirement
}

export function createStringRequirements({
	minLength = 6,
	maxLength,
	includeNumber = true,
	includeLowercase = true,
	includeSpecial = true,
	includeUppercase = true
}: StringRequirementsArgs = {}): RegExp {
	const min = minLength && minLength > 0 ? minLength : 1
	const max = maxLength && maxLength > min ? maxLength : ''
	return new RegExp(
		`^${patternFormatter('?=.*?[A-Z]', includeUppercase)}${patternFormatter(
			'?=.*?[a-z]',
			includeLowercase
		)}${patternFormatter('?=.*?[0-9]', includeNumber)}${patternFormatter(
			'?=.*?[#?!@$%^&*-]',
			includeSpecial
		)}.{${min},${max}}`
	)
}
