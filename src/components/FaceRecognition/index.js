import './FaceRecognition.css';

export default function FaceRecognition({ boxes, imageURL }) {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="input-image" src={imageURL} alt="" width='500px' height='auto' />
                {
                    boxes.map((box, index) => {
                        return <div
                            className="bounding-box"
                            key={index}
                            style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
                        ></div>
                    })
                }
            </div>
        </div>
    );
}