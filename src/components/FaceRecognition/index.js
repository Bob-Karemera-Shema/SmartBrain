export default function FaceRecognition({ imageURL }) {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={imageURL} alt="input" width='500px' height='auto'/>
            </div>
        </div>
    );
}