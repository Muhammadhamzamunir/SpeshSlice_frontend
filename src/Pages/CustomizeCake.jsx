import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SketchPicker } from 'react-color';
import Index from "../Components/API";
import { Table, Spin, Input } from 'antd';
import Button from '../Components/Button';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../Components/Firebase/firebaseConfig';
import { useUserData } from '../Components/UserAuthentication(ContextApi)';
const CustomizeCake = () => {
  const { userInfo, fetchData } = useUserData();
  const [scene, setScene] = useState(null);
  const { APIcall } = Index();
  const [searchText, setSearchText] = useState('');
  const [showDecorationOptions, setShowDecorationOptions] = useState(false);
  const [balls, setBalls] = useState();
  const [ribbons, setRibbons] = useState();
  const [decorations, setDecorations] = useState();
  const [base, setBase] = useState();
  const [body, setBody] = useState();
  const [upperBread, setUpperBread] = useState();
  const [lowerBread, setLowerBread] = useState();
  const [cream, setCream] = useState();
  const [loading, setLoading] = useState(true);
  const [filteredBakeries, setFilteredBakeries] = useState();
  const { Column } = Table;
  const { Search } = Input;
  const [checkedOptions, setCheckedOptions] = useState({
    ribbons: false,
    balls: false,
    border: false,
  });
  const [bakeries, setBakeries] = useState([]);
  const [noOfPound, setNoOfPound] = useState(0);
  const [noOfTier, setnoOfTier] = useState(0);
  const canvasRef = useRef();
  const storage = getStorage(app);
  const loader = new GLTFLoader();
  const gltfUrl = '/cake1.glb';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const poundServingData = JSON.parse(localStorage.getItem('customization'));

        if (poundServingData) {
          setNoOfPound(poundServingData.noofpound);
          setnoOfTier(poundServingData.nooftier);
        }

        const response = await APIcall('/bakery', 'GET');
        setBakeries(response.data);
        setFilteredBakeries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    loader.load(gltfUrl, (gltf) => {
      setScene(gltf.scene);
    });
  }, []);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        switch (child.name) {
          case 'base':
            setBase(child);
            break;
          case 'body':
            setBody(child);
            break;
          case 'ribbon':
            child.visible = false;
            setRibbons(child);
            break;
          case 'decorations':
            child.visible = false;
            setDecorations(child);
            break;
          case 'balls':
            child.visible = false;
            setBalls(child);
            break;
          case 'upperBread':
            setUpperBread(child);
            break;
          case 'lowerBread':
            setLowerBread(child);
            break;
          case 'cream':
            setCream(child);
            break;
          default:
            break;
        }
      });
    }
  }, [scene]);

  const handleDecorationButtonClick = () => {
    setShowDecorationOptions(!showDecorationOptions);
  };

  const handleCheckboxChange = (option) => {
    console.log(checkedOptions);
    setCheckedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  useEffect(() => {

    if (checkedOptions.balls) {
      balls.visible = true;
    } else if (!checkedOptions.balls) {
      if (balls)
        balls.visible = false;
    }
    if (checkedOptions.ribbons) {
      ribbons.visible = true;
    } else if (!checkedOptions.ribbons) {
      if (ribbons)
        ribbons.visible = false;
    }
    if (checkedOptions.border) {
      decorations.visible = true;
    } else if (!checkedOptions.border) {
      if (decorations)
        decorations.visible = false;
    }
  }, [checkedOptions, balls, ribbons, decorations]);

  const cakeBaseColors = ['#ffd700', '#d2691e', '#8b4513', '#f4a460', '#cd853f', '#deb887'];
  const decorationColors = ['#ff6347', '#7fffd4', '#9370db', '#32cd32', '#20b2aa', '#ff69b4', '#ffffff'];
  const breadColors = ['#8b4513', '#deb887'];

  const handleColorClick = (color) => {
    body.visible = true;
    if (checkedOptions.balls) {
      balls.visible = true;
    }
    if (checkedOptions.ribbons) {
      ribbons.visible = true;
    }
    if (checkedOptions.border) {
      decorations.visible = true;
    }
    base.material.color.set(color);
  };

  const handleDecorationColors = (color) => {
    ribbons.material.color.set(color);
    decorations.material.color.set(color);
    balls.material.color.set(color);
  };

  const handleBreadColor = (color) => {
    body.visible = false;
    ribbons.visible = false;
    balls.visible = false;
    decorations.visible = false;
    lowerBread.material.color.set(color);
    upperBread.material.color.set(color);
  };

  const handleCreamColor = (color) => {
    body.visible = false;
    ribbons.visible = false;
    balls.visible = false;
    decorations.visible = false;
    cream.material.color.set(color);
  };


  const downloadCustomizeCake = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const captureBlob = () => {
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        });
      });
    };

    const blob1 = await captureBlob();

    body.visible = false;
    ribbons.visible = false;
    balls.visible = false;
    decorations.visible = false;

    requestAnimationFrame(async () => {
      const blob2 = await captureBlob();

      const image1 = new Image();
      const image2 = new Image();
      image1.src = URL.createObjectURL(blob1);
      image2.src = URL.createObjectURL(blob2);

      image1.onload = async () => {
        image2.onload = async () => {
          const offscreenCanvas = document.createElement('canvas');
          offscreenCanvas.width = canvas.width;
          offscreenCanvas.height = canvas.height * 2;
          const ctx = offscreenCanvas.getContext('2d');

          ctx.drawImage(image1, 0, 0);
          ctx.drawImage(image2, 0, canvas.height);

          offscreenCanvas.toBlob(async (finalBlob) => {
            const timestamp = new Date().getTime();
            const fileName = `CustomizeCake_image_${timestamp}.png`;
            const storageRef = ref(storage, `CustomizeCake_image/${fileName}`);

            try {
              await uploadBytes(storageRef, finalBlob);
              const downloadURL = await getDownloadURL(storageRef);
              console.log('Download URL:', downloadURL);
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          });
        };
      };
    });
  };


  const calculatePrice = (bakery) => {
    let totalPrice = 0;
    if (!bakery || !noOfPound || !noOfTier) {
      return totalPrice.toFixed(2);
    }
    const pricePerPound = parseFloat(bakery.price_per_pound);
    const pricePerDecoration = parseFloat(bakery.price_per_decoration);
    const pricePerTier = parseFloat(bakery.price_per_tier);
    const tax = parseFloat(bakery.tax);

    const basePrice = (pricePerPound * noOfPound) + (bakery.price_per_tier * noOfTier);
    totalPrice += basePrice;

    if (checkedOptions.ribbons) {
      totalPrice += pricePerDecoration;
    }
    if (checkedOptions.balls) {
      totalPrice += pricePerDecoration;
    }
    if (checkedOptions.border) {
      totalPrice += pricePerTier;
    }
    totalPrice *= (1 + tax / 100);

    return totalPrice.toFixed(2);
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    if (value === '') {
      setFilteredBakeries(bakeries);
    } else {
      const filteredBakeries = bakeries.filter(bakery => bakery.business_name.toLowerCase().includes(value.toLowerCase()));
      setFilteredBakeries(filteredBakeries);
    }
  };
  const handleBuyNow = async (bakery, price) => {
    if (userInfo.user) {

      const canvas = canvasRef.current;
      if (!canvas) return;

      const captureBlob = () => {
        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          });
        });
      };

      const blob1 = await captureBlob();

      body.visible = false;
      ribbons.visible = false;
      balls.visible = false;
      decorations.visible = false;

      requestAnimationFrame(async () => {
        const blob2 = await captureBlob();

        const image1 = new Image();
        const image2 = new Image();
        image1.src = URL.createObjectURL(blob1);
        image2.src = URL.createObjectURL(blob2);

        image1.onload = async () => {
          image2.onload = async () => {
            const offscreenCanvas = document.createElement('canvas');
            offscreenCanvas.width = canvas.width;
            offscreenCanvas.height = canvas.height * 2;
            const ctx = offscreenCanvas.getContext('2d');

            ctx.drawImage(image1, 0, 0);
            ctx.drawImage(image2, 0, canvas.height);

            offscreenCanvas.toBlob(async (finalBlob) => {
              const timestamp = new Date().getTime();
              const fileName = `CustomizeCake_image_${timestamp}.png`;
              const storageRef = ref(storage, `CustomizeCake_image/${fileName}`);

              try {
                await uploadBytes(storageRef, finalBlob);
                const downloadURL = await getDownloadURL(storageRef);

                const values = {
                  'bakery_id': bakery.id,
                  'name': 'Customize Cake',
                  'image_url': downloadURL,
                  'price': price,
                  'quantity': 1
                }
                APIcall('/customizeCake', 'POST', values).then((data) => {
                  const values = {
                    'customize': true
                  }
                  console.log(userInfo.user.id, data.customize_cake.id, values);
                  APIcall(`/cart/${userInfo.user.id}/${data.customize_cake.id}/1`, 'POST', values).then((data) => {

                  })
                })
              } catch (error) {
                console.error('Error uploading image:', error);
              }
            });
          };
        };
      });

    } else {
      navigate('/login')
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
        <div className="md:flex">
          <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Customize Your Cake</h2>
            <div className="relative border h-96">
              {/* <Canvas ref={canvasRef} className="rounded-lg shadow-lg">
                <Suspense fallback={<Spin size="large" />}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[0, 5, 5]} intensity={1} />
                  {scene && <primitive object={scene} />}
                  <OrbitControls />
                </Suspense>
              </Canvas> */}
              {scene && (
                <Canvas
                  ref={canvasRef}
                  camera={{ position: [0, 4, -6], fov: 19 }}
                  onCreated={({ gl }) => {
                    gl.setClearColor('white');
                  }}
                  gl={{ preserveDrawingBuffer: true }}
                >
                  <ambientLight intensity={1} />
                  <directionalLight intensity={1} position={[0, 5, 5]} />
                  <Suspense fallback={null}>
                    <primitive object={scene} />
                  </Suspense>
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableDamping
                    dampingFactor={0.25}
                    rotateSpeed={0.5}
                  />
                </Canvas>
              )}
            </div>

            <div className='md:flex md:gap-44'>
              <div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Cake Base Color</h3>
                  <div className="flex flex-wrap">
                    {cakeBaseColors.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 m-1 rounded-full cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Cream Color</h3>
                  <div className="flex flex-wrap">
                    <div className="w-8 h-8 m-1 rounded-full cursor-pointer bg-white border" onClick={() => handleCreamColor('#ffffff')} />
                    <div className="w-8 h-8 m-1 rounded-full cursor-pointer bg-pink-200" onClick={() => handleCreamColor('#ff69b4')} />
                    <div className="w-8 h-8 m-1 rounded-full cursor-pointer bg-yellow-200" onClick={() => handleCreamColor('#ffd700')} />
                    <div className="w-8 h-8 m-1 rounded-full cursor-pointer bg-red-200" onClick={() => handleCreamColor('#ff6347')} />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Bread Color</h3>
                  <div className="flex flex-wrap">
                    {breadColors.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 m-1 rounded-full cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => handleBreadColor(color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Decoration Colors</h3>
              <div className="flex flex-wrap">
                {decorationColors.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 m-1 rounded-full cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => handleDecorationColors(color)}
                  />
                ))}
              </div>
            </div>
              </div>
              <div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Cake Outer layer Color</h3>
                  <SketchPicker color="grey" onChange={(col) => {
                    body.material.color.set(col.hex);
                  }} />
                </div>
              </div>
            </div>



            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Decorations</h3>
              <div className="flex flex-wrap">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checkedOptions.ribbons}
                    onChange={() => handleCheckboxChange('ribbons')}
                  />
                  <span className="ml-2">Ribbons</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checkedOptions.balls}
                    onChange={() => handleCheckboxChange('balls')}
                  />
                  <span className="ml-2">Balls</span>
                </label>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checkedOptions.border}
                    onChange={() => handleCheckboxChange('border')}
                  />
                  <span className="ml-2">Border</span>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Search
                placeholder="Search bakeries"
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-md"
                value={searchText}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Table dataSource={filteredBakeries}  rowKey="id" loading={loading} pagination={true}>
            <Column title="Bakery" dataIndex="business_name" key="business_name" />
            
            <Column
              title="Price"
              key="total_price"
              render={(text, record) => (
                <span>{calculatePrice(record)} $</span>
              )}
            />
            <Column
              title=""
              key="action"
              render={(text, record) => (
                <Button onClick={() => handleBuyNow(record, calculatePrice(record))}>Add to Cart</Button>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};


export default CustomizeCake;
