# grunt-maven-plugin - bug 69

This project as no other goal than to demonstrate the problem for grunt-maven-plugin :

* https://github.com/allegro/grunt-maven-plugin/issues/69

As @adamdubiel said in this issue, my needs for grunt+maven may not be in accordance with GMP philosophy.
I make a faulty configuration / file structure that leads to a malfunction.
By respecting GMP way of working, everything should be fine.

## What is the problem

While packaging, package.json is searched into basedir while bower.json is searched into target-grunt.

## What is wanted

* management for package.json and bower.json should be consistent

In a perfect world :

* Path to package.json or bower.json may be configurable
* node_modules folder should be created in the same path as package.json
* bower_components folder should be created in the same path as bower.json
** if "directory" is defined into the '.bowerrc' configuration file, bower_components folder should created as configured into the file.

## How to reproduce

```
git clone git@github.com:astik/grunt-maven-plugin-bug69.git
cd grunt-maven-plugin-bug69
mvn package
```

Here is the results :

```
$ mvn package
[INFO] Scanning for projects...
[INFO] 
[INFO] Using the builder org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder with a thread count of 1
[INFO]                                                                         
[INFO] ------------------------------------------------------------------------
[INFO] Building test-grunt-maven 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:create-resources (default) @ test-grunt-maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/src/main/webapp/static
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ test-grunt-maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.5.1:compile (default-compile) @ test-grunt-maven ---
[INFO] No sources to compile
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:npm (default) @ test-grunt-maven ---
[INFO] OS Name: Linux
npm WARN package.json grunt-maven-plugin@ No repository field.
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:bower (default) @ test-grunt-maven ---
[INFO] OS Name: Linux
bower                           ENOENT No bower.json present
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.651 s
[INFO] Finished at: 2015-02-18T12:15:43+01:00
[INFO] Final Memory: 22M/982M
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal pl.allegro:grunt-maven-plugin:1.5.0:bower (default) on project test-grunt-maven: Unable to execute mojo: Command execution failed. Process exited with an error: 1 (Exit value: 1) -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoExecutionException
```

## How to fix the demo (but not what consistency should be)

```
cp bower.json target-grunt/
mvn package
```

Here is the results :

```
$ mvn package
[INFO] Scanning for projects...
[INFO] 
[INFO] Using the builder org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder with a thread count of 1
[INFO]                                                                         
[INFO] ------------------------------------------------------------------------
[INFO] Building test-grunt-maven 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:create-resources (default) @ test-grunt-maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/src/main/webapp/static
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ test-grunt-maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.5.1:compile (default-compile) @ test-grunt-maven ---
[INFO] No sources to compile
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:npm (default) @ test-grunt-maven ---
[INFO] OS Name: Linux
npm WARN package.json grunt-maven-plugin@ No repository field.
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:bower (default) @ test-grunt-maven ---
[INFO] OS Name: Linux
bower angular#1.3.13            cached git://github.com/angular/bower-angular.git#1.3.13
bower angular#1.3.13          validate 1.3.13 against git://github.com/angular/bower-angular.git#1.3.13
bower angular         extra-resolution Unnecessary resolution: angular#1.3.13
bower angular#1.3.13           install angular#1.3.13

angular#1.3.13 bower_components/angular
[INFO] 
[INFO] --- grunt-maven-plugin:1.5.0:grunt (default) @ test-grunt-maven ---
[INFO] OS Name: Linux
Initializing
Command-line options: --no-color, --verbose

Reading "Gruntfile.js" Gruntfile...OK

Registering Gruntfile tasks.
Initializing config...OK
Loading "Gruntfile.js" tasks...OK
+ default

No tasks specified, running default tasks.
Running tasks: default

Running "default" task
Grunt is working

Done, without errors.


Execution Time (2015-02-18 11:16:45 UTC)
loading tasks  3ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 60%
default        2ms  ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇ 40%
Total 5ms

[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ test-grunt-maven ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:2.5.1:testCompile (default-testCompile) @ test-grunt-maven ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ test-grunt-maven ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-war-plugin:2.2:war (default-war) @ test-grunt-maven ---
[INFO] Packaging webapp
[INFO] Assembling webapp [test-grunt-maven] in [/home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/target/test-grunt-maven-1.0.0-SNAPSHOT]
[INFO] Processing war project
[INFO] Copying webapp resources [/home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/src/main/webapp]
[INFO] Webapp assembled in [18 msecs]
[INFO] Building war: /home/rogon/_projets/DIRTECH/__DUMMY/grunt-maven-plugin/target/test-grunt-maven-1.0.0-SNAPSHOT.war
[INFO] WEB-INF/web.xml already added, skipping
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.909 s
[INFO] Finished at: 2015-02-18T12:16:45+01:00
[INFO] Final Memory: 25M/982M
[INFO] ------------------------------------------------------------------------
```
