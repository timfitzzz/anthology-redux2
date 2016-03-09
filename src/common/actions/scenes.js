import fetch from 'isomorphic-fetch';
import request from 'axios';
import Scene from '../../server/models/scene';

// getting data
export const GET_USER_SCENE_IDS = 'GET_USER_SCENE_IDS';
export const GET_USER_SCENE_IDS_REQUEST = 'GET_USER_SCENE_IDS_REQUEST';
export const GET_USER_SCENE_IDS_SUCCESS = 'GET_USER_SCENE_IDS_SUCCESS';
export const GET_USER_SCENE_IDS_FAILED = 'GET_USER_SCENE_IDS_FAILED';

export const GET_SCENE_BRIEFS = 'GET_SCENE_BRIEFS';
export const GET_SCENE_BRIEFS_REQUEST = 'GET_SCENE_BRIEFS_REQUEST';
export const GET_SCENE_BRIEFS_SUCCESS = 'GET_SCENE_BRIEFS_SUCCESS';
export const GET_SCENE_BRIEFS_FAILED = 'GET_SCENE_BRIEFS_FAILED';

export const GET_SCENE = 'GET_SCENE';
export const GET_SCENE_REQUEST = 'GET_SCENE_REQUEST';
export const GET_SCENE_SUCCESS = 'GET_SCENE_SUCCESS';
export const GET_SCENE_FAILED = 'GET_SCENE_FAILED';

export const GET_SCENE_DOCS = 'GET_SCENE_DOCS';
export const GET_SCENE_DOCS_REQUEST = 'GET_SCENE_DOCS_REQUEST';
export const GET_SCENE_DOCS_SUCCESS = 'GET_SCENE_DOCS_SUCCESS';
export const GET_SCENE_DOCS_FAILED = 'GET_SCENE_DOCS_FAILED';

// crud ops
export const CREATE_SCENE = 'CREATE_SCENE';
export const CREATE_SCENE_REQUEST = 'CREATE_SCENE_REQUEST';
export const CREATE_SCENE_SUCCESS = 'CREATE_SCENE_SUCCESS';
export const CREATE_SCENE_FAILED = 'CREATE_SCENE_FAILED';

export const DELETE_SCENE = 'DELETE_SCENE';
export const DELETE_SCENE_REQUEST = 'DELETE_SCENE_REQUEST';
export const DELETE_SCENE_SUCCESS = 'DELETE_SCENE_SUCCESS';
export const DELETE_SCENE_FAILED = 'DELETE_SCENE_FAILED';

export const ADD_DOC_TO_SCENE = 'ADD_DOC_TO_SCENE';
export const ADD_DOC_TO_SCENE_REQUEST = 'ADD_DOC_TO_SCENE_REQUEST';
export const ADD_DOC_TO_SCENE_SUCCESS = 'ADD_DOC_TO_SCENE_SUCCESS';
export const ADD_DOC_TO_SCENE_FAILED = 'ADD_DOC_TO_SCENE_FAILED';

export const REMOVE_DOC_FROM_SCENE = 'REMOVE_DOC_FROM_SCENE';
export const REMOVE_DOC_FROM_SCENE_REQUEST = 'REMOVE_DOC_FROM_SCENE_REQUEST';
export const REMOVE_DOC_FROM_SCENE_SUCCESS = 'REMOVE_DOC_FROM_SCENE_SUCCESS';
export const REMOVE_DOC_FROM_SCENE_FAILED = 'REMOVE_DOC_FROM_SCENE_FAILED';

export const TOGGLE_SCENE_PUBLICITY = 'TOGGLE_SCENE_PUBLICITY';


// import Tweet actions

// shared functions

function responseToJson(res) {
  return res.json();
}

function checkStatusCode(res){
  if (res.status >= 400)
    throw new Error("Bad response from server");

  return res;
}


// getUserSceneIds: userId (String) -> sceneIds (Array) -> updateUserSceneIds
// updateUserSceneIds: ids (Array) -> dispatch('UPDATE_USER_SCENE_IDS', ids)
export function getUserSceneIds(userId) {
  return dispatch => {
    var action = {
          type: GET_USER_SCENE_IDS,
          userId,
          promise: Scene.isStub === true
                  ? request.post('http://127.0.0.1:3002/api/getUserSceneIds', { userId })
                  : Scene.getUserSceneIds(userId)
        };
    dispatch(action);
    return action;
  }
}

// getSceneBriefs: sceneIds (Array) -> [{sceneBrief}] -> updateSceneBriefs
// updateSceneBriefs: [{sceneBriefs}] -> dispatch('UPDATE_SCENE_BRIEFS', {[sceneBriefs]})
export function getSceneBriefs(ids) {
  return dispatch => {
    var action = {
      type: GET_SCENE_BRIEFS,
      ids: ids,
      promise: Scene.isStub === true
               ? request.post('http://127.0.0.1:3002/api/getSceneBriefs', { ids })
               : Scene.getSceneBriefs(ids)
    };
    dispatch(action);
    return action;
  }
}

// getScene: sceneId (String) -> [{scene}] -> updateScene
// updateScene: [{scene}] -> dispatch('UPDATE_SCENE', {[scene]})
export function getScene(sceneId) {
  return dispatch => {
    var action = {
          type: GET_SCENE,
          sceneId,
          promise: Scene.isStub === true
                  ? request.get(`http://127.0.0.1:3002/api/getScene/${sceneId}`)
                  : Scene.findById(sceneId)
        };
    dispatch(action);
    return action;
  }
}

// createScene: {userId: String, name: String}
//    -> dispatch('CREATE_SCENE')
//    -> {id: sceneId}
//    -> newSceneCreated(sceneId)
// newSceneCreated: sceneId (String)
//    -> dispatch('NEW_SCENE_SAVED', sceneId)
//    , getScene(sceneId)
export function createScene (userId, name) {
  return dispatch => {

    var action = {
        type: CREATE_SCENE,
        userId,
        name,
        promise: request.post("http://127.0.0.1:3002/api/createScene", { userId, name })
    };
    dispatch(action);
    return action;
  }
}
//     dispatch({
//       type: CREATE_SCENE,
//       userId,
//       name
//     });
//
//     fetch('http://127.0.0.1:3002/api/createScene', {
//       credentials: 'same-origin',
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//           userId,
//           name
//         })
//     })
//     .then(checkStatusCode)
//     .then(responseToJson)
//     .then(data => {
//       if (data) {
//         dispatch(sceneCreated(data.sceneId));
//       } else {
//         handleError();
//       }
//     })
//     .catch(handleError);
//
//     // TODO abstract error handling to separate service
//     function handleError(res){
//       dispatch({ type: CREATE_SCENE_FAILED, error: res});
//     }
//   };
// }
// export function sceneCreated(sceneId) {
//     return dispatch => {
//       dispatch({type: SCENE_CREATED,
//                 sceneId: sceneId });
//       dispatch(getScene(sceneId));
//     }
//   }

// deleteScene: sceneId

export function deleteScene (sceneId) {
  return dispatch => {

    var action = {
        type: DELETE_SCENE,
        sceneId,
        promise: request.post("http://127.0.0.1:3002/api/deleteScene", { sceneId })
    };
    dispatch(action);
    return action;
  }
}
//
//
// export function deleteScene(sceneId) {
//
//   return dispatch => {
//     dispatch({
//       type: DELETE_SCENE,
//       sceneId
//     });
//
//     fetch('http://127.0.0.1:3002/api/deleteScene', {
//       credentials: 'same-origin',
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         sceneId
//       })
//     })
//     .then(checkStatusCode)
//     .then(responseToJson)
//     .then(checkForRejection)
//     .then(data => {
//       if (data.confirmation) {
//         dispatch(sceneDeleted(data.sceneId))
//       } else {
//         handleError();
//       }
//     }).catch(handleError)
//
//     function checkForRejection(json) {
//       if (json.failure) {
//         throw new Error('Rejected: ' + json.failure);
//       }
//       return json;
//     }
//
//     function handleError(res) {
//       dispatch({
//         type: DELETE_SCENE_FAILED,
//         sceneId: sceneId,
//         error: res
//       });
//     }
//
//   }
// }
// export function sceneDeleted(sceneId) {
//
//   return dispatch => {
//     dispatch({
//       type: DELETE_SCENE_SUCCESS,
//       sceneId: sceneId
//     });
//   }
//
// }

export function getSceneDocs(sceneId) {

  return dispatch => {
    dispatch({
      type: GET_SCENE_DOCS,
      sceneId
    });

    fetch('http://127.0.0.1:3002/api/getSceneDocs', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sceneId
      })
    })
    .then(checkStatusCode)
    .then(responseToJson)
    .then(checkForRejection)
    .then(data => {
      if (data.sceneDocs) {
        dispatch(updateSceneDocs(data.sceneId, data.sceneDocs, data.docs));
      } else {
        handleError();
      }
    }).catch(handleError)

    function checkForRejection(json) {
      if (json.failure) {
        throw new Error('Rejected: ' + json.failure);
      }
      return json;
    }

    function handleError(res) {
      dispatch({
        type: GET_SCENE_DOCS_FAILED,
        sceneId: sceneId,
        error: res
      });
    }

  }

}
export function updateSceneDocs(sceneId, sceneDocs, docs) {

  return {
    type: GET_SCENE_DOCS_SUCCESS,
    sceneId,
    sceneDocs,
    docs
  }
}

export function addDocToScene(document_object, sceneId, order_by) {

  return dispatch => {
    dispatch({
      type: ADD_DOC_TO_SCENE,
      document: document_object,
      sceneId: sceneId,
      order_by: order_by
    });

    fetch('http://127.0.0.1:3002/api/addDocToScene', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        document: document_object,
        sceneId: sceneId,
        order_by: order_by
      })
    }).then(checkStatusCode)
    .then(responseToJson)
    .then(checkForRejection)
    .then(data => {
      if (data.document) {
        dispatch(docAddedToScene(data.sceneId,
                                 data.document_type,
                                 data.document,
                                 data.order_by));
      }
      else {
        handleError();
      }
    }).catch(handleError);

      function checkForRejection(json) {
        if (json.failure) {
          throw new Error('Rejected: ' + json.failure);
        }
        return json;
      }

      function handleError(res) {
        dispatch({
          type: ADD_DOC_TO_SCENE_FAILED,
          sceneId: sceneId,
          document: document_object,
          error: res
        });
      }

    }
}
export function docAddedToScene(sceneId, document_type, document, order_by) {
  return dispatch => {

    dispatch({
      type: ADD_DOC_TO_SCENE_SUCCESS,
      sceneId,
      document_type,
      document,
      order_by
    });

    dispatch(getSceneDocs(sceneId));

  }
}

// postToggleScenePublicity: sceneId
//    -> dispatch('POST_TOGGLE_SCENE_PUBLICITY')
//    -> {id: sceneId}
//    -> {}
export function postToggleScenePublicity (sceneId) {
  return dispatch => {
    dispatch({
      type: POST_TOGGLE_SCENE_PUBLICITY,
      sceneId
    });

    fetch('http://127.0.0.1:3002/api/toggleScenePublicity/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

      })

    });

  };


}
