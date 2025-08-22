---
{"dg-publish":true,"permalink":"/EFFORTS/AccelSim/"}
---


# Notes on the GPU-Simulator Accel-Sim

> [!info] Disclaimer  
> The note is not fully complete. It's always will be under constant changes (until the accel-sim development stops 😿.)

> [!success] Link to the Research Paper  
> The research paper can be find at [LINK.](https://par.nsf.gov/servlets/purl/10302226)

---

## [[EFFORTS/Configs available In AccelSim\|Available Architecture Configs]]

## [[EFFORTS/Benchmarks Available In Accel-Sim\|In-built Benchmarks]]

## [[EFFORTS/AccelSim Trials\|Benchmarks Trials]]

## [[EFFORTS/Available Traces\|Provided Traces]]

---

## Modifications made

> [!important] Define the function yyerror  
> ~/Prabin/secTry/accel-sim-framework/gpu-simulator/gpgpu-sim/src/intersim2/config.l
> ``` 
> # added
> void yyerror(const char* s);
> void yyerror(const char* s){
>   fprintf(stderr, "Parse error: %s\n", s);
> }
> ```

> [!important] Declare the function yyerror  
> ~/Prabin/secTry/accel-sim-framework/gpu-simulator/gpgpu-sim/src/intersim2/config.y
> ```
> # added
> void yyerror(const char* s);
> ```

---

## Benchmark Running Process

_**The following are examples.**_

### Simulating

`../job_launching/run_simulations.py -B parboil -C TITANV-PTX  -N parboil`

### Monitoring a process

`./util/job_launching/monitor_func_test.py -N rodT2`

### Getting Stats

`./get_stats.py -R -B ispass-2009 -C QV100-PTX | tee ../../csvStats/ispass-2009.csv`

### Plotting
> [!warning] Yet to be done
> 

---

## [[EFFORTS/Things to try out\|Things to try out]]

## TUNER Correlating

[[EFFORTS/Tuner Correlating in Accelsim\|Tuner Correlating in Accelsim]]

---

> [!warning] This section is not complete.

## Steps For Release Branch

[[EFFORTS/Release Branch Installation\|Release Branch Installation]]
