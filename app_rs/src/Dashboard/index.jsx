import { invoke } from '@tauri-apps/api/tauri';
import { Save } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import OverlayComponent from "./OverlayComponent";
import { setOverlayComponent } from '../stateController/dashboard';

import "./style.scss";
import FeatureContent from "./features/FeatureContent";

function Dashboard () {
  const dispatch = useDispatch();
  const overlayChoice
    = useSelector(state => state.dashboard.overlayComponent);

  const userData = useSelector(state => state.userData.data);
  const filePath = useSelector(state => state.configuration.filePath);

  return (
    <>
    <div className="dashboard">
      <nav>
        <div className="left">
          <img src="/Logo.svg" alt="First attempt at a logo" />
          <span>Tracker App</span>
        </div>
        <div className="right">
          <button onClick={() => handleSave(userData, filePath)}>
            <Save color="white" />
          </button>
        </div>
      </nav>
      <main>
        <div className="left-bar"></div>
        <div className="content">
          <FeatureContent />
        </div>
      </main>
    </div>
    <div
      className={"pop-up " + ((overlayChoice !== null) ? "shown" : "hidden")}
      onClick={() => dispatch(setOverlayComponent(null))}
    >
      <OverlayComponent dataInput={overlayChoice} />
    </div>
    </>
  );
}

function EmptyContent() {
  return (
    <div className="empty-content">
      <span className="main-message">Nothing to show here</span>
      <span className="comment">Add an item from the options below</span>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <div className="loading">Loading data...</div>
  )
}

async function handleSave(dataMap, filePath) {
  await invoke("save_file", {
    dataMap,
    filePath
  });
}

export default Dashboard;
