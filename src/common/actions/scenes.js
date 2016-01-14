import fetch from 'isomorphic-fetch';


// getting data
export const GET_USER_SCENE_IDS = 'GET_USER_SCENE_IDS';
export const UPDATE_USER_SCENE_IDS = 'UPDATE_USER_SCENE_IDS';
export const GET_USER_SCENE_IDS_FAILED = 'GET_USER_SCENE_IDS_FAILED';

export const GET_SCENE_BRIEFS = 'GET_SCENE_BRIEFS';
export const UPDATE_SCENE_BRIEFS = 'UPDATE_SCENE_BRIEFS';
export const GET_SCENE_BRIEFS_FAILED = 'GET_SCENE_BRIEFS_FAILED';

export const GET_SCENE = 'GET_SCENE';
export const UPDATE_SCENE = 'UPDATE_SCENE';
export const GET_SCENE_FAILED = 'GET_SCENE_FAILED';

export const GET_SCENE_DOCS = 'GET_SCENE_DOCS';
export const UPDATE_SCENE_DOCS = 'UPDATE_SCENE_DOCS';
export const GET_SCENE_DOCS_FAILED = 'GET_SCENE_DOCS_FAILED';

// crud ops
export const CREATE_SCENE = 'CREATE_SCENE';
export const SCENE_CREATED = 'SCENE_CREATED';
export const CREATE_SCENE_FAILED = 'CREATE_SCENE_FAILED';

export const DELETE_SCENE = 'DELETE_SCENE';
export const SCENE_DELETED = 'SCENE_DELETED';
export const DELETE_SCENE_FAILED = 'DELETE_SCENE_FAILED';

export const ADD_DOC_TO_SCENE = 'ADD_DOC_TO_SCENE';
export const DOC_ADDED_TO_SCENE = 'DOC_ADDED_TO_SCENE';
export const ADD_DOC_TO_SCENE_FAILED = 'ADD_DOC_TO_SCENE_FAILED';

export const REMOVE_DOC_FROM_SCENE = 'REMOVE_DOC_FROM_SCENE';
export const DOC_REMOVED_FROM_SCENE = 'DOC_REMOVED_FROM_SCENE';
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
    dispatch({
      type: GET_USER_SCENE_IDS,
      userId: userId
    });

    return fetch('http://127.0.0.1:3002/api/getUserSceneIds', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        userId: userId
      })
    })
      .then(checkStatusCode)
      .then(response => response.json())
      .then(json => {
        if (json.userScenes){
          dispatch(updateUserSceneIds(userId, json.userScenes));
          // TODO create more dumb components and move dispatcher to parent -> actionName=dispatch(actionName()) and then child will just call this! :)
          //window.history.pushState(null, null, '/')
        } else {
          handleError();
        }
      })
      .catch(handleError);

    // TODO abstract error handling to separate service

    function handleError(res){
      dispatch({ type: GET_USER_SCENE_IDS_FAILED, error: res});
    }
  };
}
export function updateUserSceneIds(userId, sceneIds) {
  return dispatch => {

  dispatch({
      type: UPDATE_USER_SCENE_IDS,
      userId: userId,
      userScenes: sceneIds
    });
    dispatch(getSceneBriefs(sceneIds));
  }
}

// getSceneBriefs: sceneIds (Array) -> [{sceneBrief}] -> updateSceneBriefs
// updateSceneBriefs: [{sceneBriefs}] -> dispatch('UPDATE_SCENE_BRIEFS', {[sceneBriefs]})
export function getSceneBriefs(ids) {
  return dispatch => {
    dispatch({
      type: GET_SCENE_BRIEFS,
      ids
    });

    return fetch('http://127.0.0.1:3002/api/getSceneBriefs', {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        ids: ids
      })
    })
      .then(checkStatusCode)
      .then(responseToJson)
      .then(data => {
        if (data) {
          dispatch(updateSceneBriefs(data));
        } else {
          handleError();
        }
      })
      .catch(handleError);

    // TODO abstract error handling to separate service

    function handleError(res){
      dispatch({ type: GET_SCENE_BRIEFS_FAILED, error: res});
    }
  };
}
export function updateSceneBriefs(data) {
  return {
    type: UPDATE_SCENE_BRIEFS,
    sceneBriefs: data
  };
}

// getScene: sceneId (String) -> [{scene}] -> updateScene
// updateScene: [{scene}] -> dispatch('UPDATE_SCENE', {[scene]})
export function getScene(sceneId) {
  return dispatch => {
    dispatch({
      type: GET_SCENE,
      sceneId: sceneId
    });

    return fetch('http://127.0.0.1:3002/api/getScene/' + sceneId,{
      credentials: 'same-origin'
    })
    .then(checkStatusCode)
    .then(responseToJson)
    .then(data => {
      if (data){
        dispatch(updateScene(data));
        // TODO create more dumb components and move dispatcher to parent -> actionName=dispatch(actionName()) and then child will just call this! :)
        //window.history.pushState(null, null, '/')
      } else {
        handleError();
      }
    })
    .catch(handleError);

    // TODO abstract error handling to separate service

    function handleError(res){
      dispatch({ type: GET_SCENE_FAILED, error: res});
    }
  };
}
export function updateScene(scene) {
  return {
    type: UPDATE_SCENE,
    scene
  };
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

    dispatch({
      type: CREATE_SCENE,
      userId,
      name
    });

    fetch('http://127.0.0.1:3002/api/createScene', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId,
          name
        })
    })
    .then(checkStatusCode)
    .then(responseToJson)
    .then(data => {
      if (data) {
        dispatch(sceneCreated(data.sceneId));
      } else {
        handleError();
      }
    })
    .catch(handleError);

    // TODO abstract error handling to separate service
    function handleError(res){
      dispatch({ type: CREATE_SCENE_FAILED, error: res});
    }
  };
}
export function sceneCreated(sceneId) {
    return dispatch => {
      dispatch({type: SCENE_CREATED,
                sceneId: sceneId });
      dispatch(getScene(sceneId));
    }
  }

// deleteScene: sceneId

export function deleteScene(sceneId) {

  return dispatch => {
    dispatch({
      type: DELETE_SCENE,
      sceneId
    });

    fetch('http://127.0.0.1:3002/api/deleteScene', {
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
      if (data.confirmation) {
        dispatch(sceneDeleted(data.sceneId))
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
        type: DELETE_SCENE_FAILED,
        sceneId: sceneId,
        error: res
      });
    }

  }
}
export function sceneDeleted(sceneId) {

  return dispatch => {
    dispatch({
      type: SCENE_DELETED,
      sceneId: sceneId
    });
  }

}

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
    type: UPDATE_SCENE_DOCS,
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
      type: DOC_ADDED_TO_SCENE,
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
