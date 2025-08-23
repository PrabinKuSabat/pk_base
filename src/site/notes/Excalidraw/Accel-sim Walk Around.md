---
{"dg-publish":true,"permalink":"/Excalidraw/Accel-sim Walk Around/","tags":["excalidraw"]}
---


==⚠ Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'

# Excalidraw Data

## Text Elements

First Satisfy all the dependencies.
{ #tk6BAdGM}


TRACER
{ #oXK2uByp}


CORRELATOR
{ #x2QYMd5s}


PLOTTING
{ #rC4cltS1}


TUNER
{ #uCTYIqtM}


THINGS TO KEEP IN MIND:
1. You require the hardware to generate the traces.
2. The hardware should be compatible with the installed CUDA version.  
(Which basically means the code should run in that hardware after compilation.)
3. For a hardware with SM a.x (e.g. a.x = 7.6), we can get started with any other hardware with SM a.y(where y can be any version number).  
{It's only to get started, the exact hardware is required for prefect tuning}
{ #3zLO0fHb}


COMMANDS TO GENERATE TRACES
{ #duqrYlCZ}


Do this before you get started:

export CUDA_INSTALL_PATH=<your_cuda>  
export PATH=$CUDA_INSTALL_PATH/bin:$PATH  
./util/tracer_nvbit/install_nvbit.sh  
make -C ./util/tracer_nvbit/
{ #GWjvO21e}


Add you executable scripts and data files to:

./accel-sim-framework/util/job_launching/apps/define-all-apps.yml  

{ #Ibx3JqIx}


mlperf_inference_no_external_datasets:  
	 exec_dir: "$GPUAPPS_ROOT/bin/$CUDA_VERSION/release/"  
	 data_dirs: ""  
	 execs:  
		  - inference_mlperf_bert:  
				- args:  
				  accel-sim-mem: 60G  
		  - inference_mlperf_ssd:  
				- args:  
				  accel-sim-mem: 60G
{ #45U46MMW}


Example
{ #X7AdMtjV}


Next Generate the traces for your Benchmark by using:

./util/tracer_nvbit/run_hw_trace.py -B vectorAdd -D 0  

{ #ODsw1Ua5}



