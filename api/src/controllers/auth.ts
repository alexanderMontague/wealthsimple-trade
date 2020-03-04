import { createResponse } from '../helpers'
import { WST_login } from '../helpers/requests'

/*
 *   POST /api/v1/login
 *
 *   ENCODED
 *   REQ: {
 *     login: {
 *       identifier: String,
 *       password: String,
 *     }
 *   }
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
export async function login(req, res, next) {
    const credentials = { ...req.body }

    if (!credentials.email) {
        return res.json(
            createResponse(200, 'An email needs to be present', null, true)
        )
    }

    if (!credentials.password) {
        return res.json(
            createResponse(200, 'A password needs to be present', null, true)
        )
    }

    let loginResponse
    try {
        loginResponse = await WST_login(credentials)
    } catch (error) {
        return res.json(
            createResponse(200, error.response?.data?.error, null, true)
        )
    }

    const tokens = {
        access: loginResponse.headers['x-access-token'],
        refresh: loginResponse.headers['x-refresh-token'],
    }

    res.json(
        createResponse(
            200,
            'Successfully logged in!',
            { ...loginResponse.data, tokens },
            false
        )
    )
}

/*
 *   GET /api/v1/auth/logout
 *
 *   REQ: NULL
 *
 *   RES: {
 *     response: {
 *       code: Integer,
 *       message: String,
 *       data: Object || Array || null,
 *       error: Boolean
 *     }
 *   }
 */
// function logoutUser(req, res) {
//   if (!req.isAuthenticated()) {
//     return res.json(createResponse(200, 'You are not logged in!', null, true));
//   }

//   req.logOut();
//   return res.json(createResponse(200, 'Successfully logged out.', null, false));
// }

// /*
//  *   GET /api/v1/public/getStatus
//  *
//  *   REQ: NULL
//  *
//  *   RES: {
//  *     response: {
//  *       code: Integer,
//  *       message: String,
//  *       data: Object || Array || null,
//  *       error: Boolean
//  *     }
//  *   }
//  */
// async function getStatus(req, res) {
//   if (req.isAuthenticated()) {
//     const { password, ...userObject } = req.user._doc;

//     // Update portfolio current value, each coin current price, and 24 hr prices
//     // WILL mutate portfolio
//     userObject.portfolio = await updatePortfolio(userObject.portfolio, userObject.baseCurrency);

//     return res.json(
//       createResponse(
//         200,
//         'User is Authenticated',
//         {
//           isAuthenticated: true,
//           user: userObject,
//         },
//         false
//       )
//     );
//   }
//   return res.json(
//     createResponse(
//       200,
//       'User is NOT Authenticated',
//       {
//         isAuthenticated: false,
//         user: null,
//       },
//       false
//     )
//   );
// }
