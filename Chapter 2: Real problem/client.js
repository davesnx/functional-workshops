import fetch from 'isomorphic-fetch'

const PARAMS = {
  refToken: '',
  apiHost: '',
  adminHost: ''
}

const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'

export const ERROR_API_DOWN = 'error-api-down'
export const ERROR_FORM_PRIVATE = 'error-form-private'
export const ERROR_UNSUPPORTED_BLOCK = Error('error-unsupported-block')
export const ERROR_HAS_WELCOME_SCREEN = Error('error-has-welcome-screen')
export const ERROR_REQUEST_FAILED = Error('error-request-failed')
export const ERROR_MISSING_FORM_ID = Error('Missing form id')
export const ERROR_MISSING_THEME_HREF = Error('Missing theme href')

export async function getForm (uid) {
  if (uid == null) {
    throw ERROR_MISSING_FORM_ID
  }

  const url = `${PROTOCOL}://${PARAMS.apiHost}/forms/${uid}`

  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${PARAMS.refToken}`
    }
  })

  if (!resp.ok) {
    throw ERROR_REQUEST_FAILED
  }

  return resp.json()
}

export async function getTheme (theme) {
  if (!theme || !theme.href) {
    throw ERROR_MISSING_THEME_HREF
  }

  const resp = await fetch(theme.href, {
    headers: {
      Authorization: `Bearer ${PARAMS.refToken}`
    }
  })

  return resp.json()
}

export async function updateForm (form) {
  if (!form || !form.id) {
    throw ERROR_MISSING_FORM_ID
  }

  const url = `${PROTOCOL}://${PARAMS.apiHost}/forms/${form.id}`
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PARAMS.refToken}`
    },
    body: JSON.stringify(form)
  })

  return resp.json()
}

function unsupportedReason (form) {
  if (containsWelcomeScreen(form)) {
    return ERROR_HAS_WELCOME_SCREEN
  }

  const block = getFirstBlock(form)

  if (!isBlockSupported(block)) {
    return ERROR_UNSUPPORTED_BLOCK
  }

  return null
}

function getFirstBlock (form) {
  if (!form || !form.fields || !form.fields.length) {
    return null
  }

  return form.fields[0]
}

function isBlockSupported (block) {
  return block && SUPPORTED_BLOCKS.includes(block.type)
}

function containsWelcomeScreen (form) {
  return form && form.welcome_screens && form.welcome_screens.length > 0
}
